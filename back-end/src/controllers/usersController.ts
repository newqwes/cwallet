import ApiError from '../exceptions/apiError';
import userService from '../services/userService';
import UserDto from '../dto/userDto';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

export const getUsersData = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const users = await userService.findAll();
    if (!users) {
      return next(ApiError.BadRequest('User not created'));
    }

    return res.status(200).json(users.map((user) => new UserDto(user)));
  } catch (e) {
    next(e);
  }
};
