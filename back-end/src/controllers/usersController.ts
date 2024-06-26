import ApiError from '../exceptions/apiError';
import userService from '../services/userService';
import UserDto from '../dto/userDto';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

export const getUsersData = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`GET_USERS_DATA: Attempting to retrieve all users data`);
  try {
    const users = await userService.findAll();
    if (!users) {
      logger.error(`GET_USERS_DATA: No users found in the database`);
      return next(ApiError.BadRequest('No users found'));
    }

    logger.debug(`GET_USERS_DATA: Retrieved ${users.length} users`);
    return res.status(200).json(users.map((user) => new UserDto(user)));
  } catch (e) {
    logger.error(`GET_USERS_DATA: Error retrieving users - ${e}`);
    next(e);
  }
};
