import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import UserService from "../services/userService";
import moment from "moment";
import { getRandomInt } from '../utils/random';

export const claim = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id)

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const validDateForClaim = new Date() > new Date(user.nextDateUpdate);

    if (!validDateForClaim) {
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    // TODO: move min and max to .env or write to DB like 'settings' table
    const claimedCoins = getRandomInt(50, 150, user.claimBias, user.claimInfluence);
    const extraTimeInMinutes = getRandomInt(15, 120, user.timeBias, user.timeInfluence);
    const now = moment();
    now.add(extraTimeInMinutes, 'minutes');
    const nextDate = now.toDate();
    user.coins += claimedCoins;
    user.nextDateUpdate = nextDate;
    await user.save();

    return res.status('201').json({ claimedCoins, nextDate });
  } catch (e) {
    next(e);
  }
};
