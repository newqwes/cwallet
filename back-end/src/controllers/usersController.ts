import UserService from '../services/userService';
import ShortGameDataService from '../services/shortGameDataServices';
import UserDto from '../dto/userDto';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

export const getUsersData = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`GET_USERS_DATA: Attempting to retrieve all users data`);
  try {
    const users = await UserService.findAll();
    const shortGames = await ShortGameDataService.findAllGroupEndedGames();

    const gamesByUserId = shortGames.reduce((acc, game) => {
      acc[game.user_id] = game.toJSON();
      return acc;
    }, {});

    const result = users.map((user) => {
      const shortGame = gamesByUserId[user.id];
      // @ts-ignore
      return new UserDto({
        ...user.toJSON(),
        shortVolatility: shortGame ? shortGame.average_volatility_result : 0,
        shortPlace: shortGame ? shortGame.average_place : 0,
        shortGames: shortGame ? shortGame.games_count : 0,
      });
    });

    logger.debug(`GET_USERS_DATA: Retrieved ${users.length} users`);
    return res.status(200).json(result);
  } catch (e) {
    logger.error(`GET_USERS_DATA: Error retrieving users - ${e}`);
    next(e);
  }
};
