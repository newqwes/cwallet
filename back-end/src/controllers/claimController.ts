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

    const validDateForClaim = new Date() > new Date(user.nextClaimDate);

    if (!validDateForClaim) {
      return next(ApiError.AlreadyExists('Its not time yet'));
    }

    // TODO: move min and max to .env or write to DB like 'settings' table
    const coins = getRandomInt(50, 150, user.claimBias, user.claimInfluence) + user.coins;
    const extraTimeInMinutes = getRandomInt(1, 2, user.timeBias, user.timeInfluence);
    const now = moment();
    now.add(extraTimeInMinutes, 'minutes');
    const nextClaimDate = now.toDate();
    user.coins = coins;
    user.nextClaimDate = nextClaimDate;
    await user.save();

    return res.status('201').json({ coins, nextClaimDate });
  } catch (e) {
    next(e);
  }
};
