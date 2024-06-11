import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import UserService from "../services/userService";
import moment from "moment";
import { getClaimCoins, getExtraTimeInMinutes } from "../utils/claimCoins";
import { FIRST_LEVEL_REF_BACK, SECOND_LEVEL_REF_BACK } from "../constants/referrals";

export const claim = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const validDateForClaim = new Date() > new Date(user.nextClaimDate);

    if (!validDateForClaim) {
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    // TODO: добавь перевменную с везением
    const claimedCoins = getClaimCoins({
      claimBias: user.claimBias,
      claimInfluence: user.claimInfluence,
      miningLevel: user.miningLevel,
      timeLevel: user.timeLevel,
    });

    const extraTimeInSeconds = getExtraTimeInMinutes(
      {
        timeLevel: user.timeLevel,
        timeBias: user.timeBias,
        timeInfluence: user.timeInfluence,
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

      if (parent) {
        parent.referralRewards += claimedCoins * FIRST_LEVEL_REF_BACK;
        await parent.save();
      }
    }

    if (user.refGrandParent) {
      const grandParent = await UserService.findByTelegramUserId(user.refGrandParent);

      if (grandParent) {
        grandParent.referralRewards += claimedCoins * SECOND_LEVEL_REF_BACK;
        await grandParent.save();
      }
    }

    return res.status('201').json({coins: user.coins, nextClaimDate});
  } catch (e) {
    next(e);
  }
};
