import ApiError from '../exceptions/apiError';
import CoinListService from '../services/coinListService';
import TinderGameService from '../services/tinderGameService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

export const setInfo = async (
  req: CustomRequest,
  res: CustomResponse,
  next: CustomNextFunction
) => {
  logger.info(
    `TINDER_GAME_SET_INFO_CONTROLLER: Attempting to set info for user ${req.user.telegramId}`
  );
  try {
    const user = req.user;
    //['bitcoin', 'ethirium']
    const { chose_coins, reward } = req.body;

    for (let coin_id of chose_coins) {
      const coin_info = await CoinListService.findOneByCoinId(coin_id);
      if (!coin_info) {
        logger.warn(
          `TINDER_GAME_SET_INFO_CONTROLLER: Coin does not exist - ${coin_id}`
        );
        return next(ApiError.BadRequest('Coin doesnt exist'));
      }

      const { id } = coin_info.toJSON();

      const create_data = {
        user_id: user.id,
        coin_list_id: id,
        game_period: new Date(),
      };

      const tinder_game_exist =
        await TinderGameService.findOrCreate(create_data);

      if (tinder_game_exist.created) {
        user.coins += reward;
        await user.save();
      } else {
        logger.warn(
          `TINDER_GAME_SET_INFO_CONTROLLER: User has got the reward yet - user_id: ${user.id}`
        );
        return next(ApiError.BadRequest('User has got the reward yet'));
      }
    }

    logger.info(
      `TINDER_GAME_SET_INFO_CONTROLLER: Task set and reward claimed for user ${req.user.telegramId}`
    );
    return res.status(201).json({ user });
  } catch (e) {
    logger.error(
      `TINDER_GAME_SET_INFO_CONTROLLER: Error setting task for user ${req.user.telegramId} - ${e}`
    );
    next(e);
  }
};
