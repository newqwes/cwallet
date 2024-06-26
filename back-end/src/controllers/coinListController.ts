import CoinListService from '../services/coinListService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';
import dotenv from 'dotenv';
dotenv.config();

export const getCoinInfo = async (
  req: CustomRequest,
  res: CustomResponse,
  next: CustomNextFunction
) => {
  logger.info(
    `COIN_INFO_CONTROLLER: Received request to get coin info with ID: ${req.params.id}`
  );

  try {
    const { id } = req.params;
    if (!id) {
      logger.warn(
        'COIN_INFO_CONTROLLER: No coin ID provided in request params'
      );
      return next(new Error('No coin ID provided'));
    }

    const result = await CoinListService.findOneById(id);
    if (!result) {
      logger.warn(`COIN_INFO_CONTROLLER: No coin found with ID: ${id}`);
      return res.status(404).json({ message: 'Coin not found' });
    }

    logger.info(`COIN_INFO_CONTROLLER: Found coin info for ID: ${id}`);
    return res.status(201).json({ result });
  } catch (e) {
    logger.error(
      `COIN_INFO_CONTROLLER: Error retrieving coin info for ID: ${req.params.id} - ${e}`
    );
    next(e);
  }
};

export const getActiveCoins = async (
  req: CustomRequest,
  res: CustomResponse,
  next: CustomNextFunction
) => {
  try {
    const limit = Number(process.env.TINDER_GAME_COINS_LIMIT || 15);
    const result = await CoinListService.getActiveCoins(limit);
    logger.info(`GET_ACTIVE_COIN_INFO_CONTROLLER: Found active coins`);
    return res.status(201).json({ result });
  } catch (e) {
    logger.error(
      `GET_ACTIVE_COIN_INFO_CONTROLLER: Error retrieving active coins info: - ${e}`
    );
    next(e);
  }
};
