import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';
import CoinListService from '../services/coinListService';
import ApiError from '../exceptions/apiError';
import dotenv from 'dotenv';
dotenv.config();

export const getCoinInfo = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);
    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const { id } = req.params;
    const result = await CoinListService.findOneById(id);

    return res.status('201').json({ result });
  } catch (e) {
    next(e);
  }
};
