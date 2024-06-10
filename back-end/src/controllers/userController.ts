import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import userService from '../services/userService';
import UserDto from '../dto/userDto';
import { get } from 'lodash';

export const getUserData = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    console.log('--QWES-- initData: ', initData);
    const refParent: string = get(req, ['query', 'refParent'], null);
    const {user, created}: any = await userService.findOrCreateById(initData.user, refParent);

    if (!user) {
      return next(ApiError.BadRequest('User not created'));
    }

    return res.status(200).json({user: new UserDto(user), created});
  } catch (e) {
    next(e);
  }
};
