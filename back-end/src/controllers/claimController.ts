import ApiError from '../exceptions/apiError';
import UserService from '../services/userService';
import moment from 'moment';
import { getClaimCoins, getExtraTimeInMinutes } from '../utils/claimCoins';
import { FIRST_LEVEL_REF_BACK, SECOND_LEVEL_REF_BACK } from '../constants/referrals';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

export const claim = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;
    const validDateForClaim = new Date() > new Date(user.nextClaimDate);

    if (!validDateForClaim) {
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    // TODO: добавь переменную с везением
    const claimedCoins = getClaimCoins({
      claimBias: user.claimBias,
      claimInfluence: user.claimInfluence,
      miningLevel: user.miningLevel,
      timeLevel: user.timeLevel
    });

    const extraTimeInSeconds = getExtraTimeInMinutes(
      {
        timeLevel: user.timeLevel,
        timeBias: user.timeBias,
        timeInfluence: user.timeInfluence
      }
    );

    const now = moment();
    now.add(extraTimeInSeconds, 'seconds');
    const nextClaimDate = now.toDate();
    user.coins += claimedCoins;
    user.nextClaimDate = nextClaimDate;
    await user.save();

    if (user.refParent) {
      const parent = await UserService.findByTelegramUserId(user.refParent);

      const referralRewards = claimedCoins * FIRST_LEVEL_REF_BACK;
      if (parent) {
        parent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await parent.save();
      }
    }

    if (user.refGrandParent) {
      const grandParent = await UserService.findByTelegramUserId(user.refGrandParent);

      const referralRewards = claimedCoins * SECOND_LEVEL_REF_BACK;
      if (grandParent) {
        grandParent.referralRewards += referralRewards > 1 ? referralRewards : 1;
        await grandParent.save();
      }
    }

    return res.status(201).json({ coins: user.coins, nextClaimDate });
  } catch (e) {
    next(e);
  }
};
