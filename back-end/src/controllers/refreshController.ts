import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import UserService from "../services/userService";

export const refresh = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(req);
    // UserService.findByTelegramUserId(initData.)
    console.log('--QWES-- initData: ', initData);
    console.log('--QWES-- initData: ', initData);

    return res.status('201').json(initData);
  } catch (e) {
    next(ApiError.BadRequest('Error 001'));
  }
};
