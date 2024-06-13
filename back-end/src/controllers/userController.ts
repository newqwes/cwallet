import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import userService from '../services/userService';
import UserDto from '../dto/userDto';
import { NextFunction } from "express";

export const getUserData = async (req: any, res: any, next: NextFunction) => {
  try {
    const initData = getInitData(res);
    const {user, created}: any = await userService.findOrCreateById(initData.user);

    if (!user) {
      return next(ApiError.BadRequest('User not created'));
    }

    return res.status(200).json({user: new UserDto(user), created});
  } catch (e) {
    next(e);
  }
};
