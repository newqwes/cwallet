import ApiError from '../exceptions/apiError';
import UserService from '../services/userService';
import moment from 'moment';
import { getClaimCoins, getExtraTimeInMinutes, getInfluenceLuck } from '../utils/claimCoins';
import { FIRST_LEVEL_REF_BACK, SECOND_LEVEL_REF_BACK } from '../constants/referrals';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { round } from 'lodash';
import { logger } from '../logger';

export const claim = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;
    const validDateForClaim = new Date() > new Date(user.nextClaimDate);

    if (!validDateForClaim) {
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    const claimedCoins = getClaimCoins({
      claimBias: getInfluenceLuck(user.claimBias, user.luckLevel),
      claimInfluence: getInfluenceLuck(user.claimInfluence, user.luckLevel),
      miningLevel: user.miningLevel,
      timeLevel: user.timeLevel
    });

    const extraTimeInSeconds = getExtraTimeInMinutes(
      {
        timeLevel: user.timeLevel,
        timeBias: getInfluenceLuck(user.timeBias, user.luckLevel),
        timeInfluence: getInfluenceLuck(user.timeInfluence, user.luckLevel)
      }
    );

    const now = moment();
    now.add(extraTimeInSeconds.result, 'seconds');
    const nextClaimDate = now.toDate();
    user.coins += claimedCoins.result;
    user.nextClaimDate = nextClaimDate;
    await user.save();

    if (user.refParent) {
      const parent = await UserService.findByTelegramUserId(user.refParent);

      const referralRewards = round(claimedCoins.result * FIRST_LEVEL_REF_BACK);
      if (parent) {
        parent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await parent.save();
      }
    }

    if (user.refGrandParent) {
      const grandParent = await UserService.findByTelegramUserId(user.refGrandParent);

      const referralRewards = round(claimedCoins.result * SECOND_LEVEL_REF_BACK);
      if (grandParent) {
        grandParent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await grandParent.save();
      }
    }

    return res.status(201).json({ coins: user.coins, nextClaimDate });
  } catch (e) {
    logger.error('CLAIM_CONTROLLER (Claim): ' + JSON.stringify(e));
    next(e);
  }
};
