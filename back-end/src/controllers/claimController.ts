import ApiError from '../exceptions/apiError';
import UserService from '../services/userService';
import moment from 'moment';
import { getClaimCoins, getExtraTimeInMinutes, getInfluenceLuck } from '../utils/claimCoins';
import { FIRST_LEVEL_REF_BACK, SECOND_LEVEL_REF_BACK } from '../constants/referrals';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { round } from 'lodash';
import { logger, TELEGRAM_LOGGER_KEY } from '../logger';

export const claim = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info('CLAIM_CONTROLLER (Claim): Request received');

  try {
    const user = req.user;
    const validDateForClaim = new Date() > new Date(user.nextClaimDate);
    logger.debug(`CLAIM_CONTROLLER (Claim): User status - ${JSON.stringify({
      userId: user.telegramId,
      nextClaimDate: user.nextClaimDate
    })}`);

    if (!validDateForClaim) {
      logger.warn(`CLAIM_CONTROLLER (Claim): Attempt to claim too early by user ${user.telegramId}`);
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    const claimDetails = {
      claimBias: getInfluenceLuck(user.claimBias, user.luckLevel),
      claimInfluence: getInfluenceLuck(user.claimInfluence, user.luckLevel),
      miningLevel: user.miningLevel,
      timeLevel: user.timeLevel
    };
    const claimedCoins = getClaimCoins(claimDetails);
    logger.info(`CLAIM_CONTROLLER (Claim): Coins claimed - ${claimedCoins.result}, calculated from - ${JSON.stringify(claimDetails)}`);

    const extraTimeDetails = {
      timeLevel: user.timeLevel,
      timeBias: getInfluenceLuck(user.timeBias, user.luckLevel),
      timeInfluence: getInfluenceLuck(user.timeInfluence, user.luckLevel)
    };
    const extraTimeInSeconds = getExtraTimeInMinutes(extraTimeDetails);
    logger.debug(`CLAIM_CONTROLLER (Claim): Extra time in seconds - ${extraTimeInSeconds.result}, calculated from - ${JSON.stringify(extraTimeDetails)}`);

    const now = moment();
    now.add(extraTimeInSeconds.result, 'seconds');
    const nextClaimDate = now.toDate();
    user.coins += claimedCoins.result;
    user.nextClaimDate = nextClaimDate;
    await user.save();
    logger.info(`CLAIM_CONTROLLER (Claim): Updated user id ${user.telegramId} name ${user.firstName} with new coin total and next claim date`);
    logger.info(`💎 Claim. \nUserid: ${user.telegramId}, name: ${user.firstName}\nclaimedCoins: ${claimedCoins.result} ${TELEGRAM_LOGGER_KEY}`);
    if (user.refParent) {
      const parent = await UserService.findByTelegramUserId(user.refParent);
      const referralRewards = round(claimedCoins.result * FIRST_LEVEL_REF_BACK);
      if (parent) {
        parent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await parent.save();
        logger.info(`CLAIM_CONTROLLER (Claim): Updated parent user ${parent.telegramId} with referral rewards`);
      }
    }

    if (user.refGrandParent) {
      const grandParent = await UserService.findByTelegramUserId(user.refGrandParent);
      const referralRewards = round(claimedCoins.result * SECOND_LEVEL_REF_BACK);
      if (grandParent) {
        grandParent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await grandParent.save();
        logger.info(`CLAIM_CONTROLLER (Claim): Updated grand parent user ${grandParent.telegramId} with referral rewards`);
      }
    }

    logger.info(`CLAIM_CONTROLLER (Claim): Successful response sent`);
    return res.status(201).json({ coins: user.coins, nextClaimDate });
  } catch (e) {
    logger.error('CLAIM_CONTROLLER (Claim): Exception occurred - ' + JSON.stringify(e));
    next(e);
  }
};
