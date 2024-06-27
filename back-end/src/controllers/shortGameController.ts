import CoinListService from '../services/coinListService';
import ShortGameCoinsService from '../services/shortGameCoinsService';
import ShortGameDataService from '../services/shortGameDataServices';
import ApiError from '../exceptions/apiError';
import { getActiveGameTimePeriod, getGameTimePeriod } from '../utils/getProgressTimePeriod';
import sequelize from '../database';
import { getRewardsForShortGame } from '../utils/rewardsForShortGame';
import { CustomRequest, CustomResponse, CustomNextFunction } from '../models';
import { logger, TELEGRAM_LOGGER_KEY } from '../logger';

export const getDataByShortGame = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`SHORT_GAME_CONTROLLER: User ${req.user.telegramId} retrieving data for short game`);
  try {
    const user = req.user;
    const game_coins = [];
    const result = await ShortGameCoinsService.findSortCoins();

    for (let el of result) {
      const { coin_list_id, start_price, volatility } = el.toJSON();
      const coin_info = await CoinListService.findOneById(coin_list_id);
      const coin_info_json = coin_info.toJSON();
      game_coins.push({
        coin_list_id,
        start_price,
        volatility,
        coin_info: coin_info_json
      });
    }
    logger.debug(`SHORT_GAME_CONTROLLER: Game coins prepared for user ${req.user.telegramId}`);

    const selected_coin_data = await ShortGameDataService.findActiveGameByUserId(user.id);
    let is_shown = true;
    if (selected_coin_data) {
      is_shown = selected_coin_data.is_shown;
      selected_coin_data.is_shown = true;
      await selected_coin_data.save();
    }

    const history = await ShortGameDataService.historyByUserId(user.id);
    const is_active = getActiveGameTimePeriod(); // Time when users can choose coin
    const game_period = getGameTimePeriod();

    logger.info(`SHORT_GAME_CONTROLLER: Data sent for user ${req.user.telegramId}`);
    return res.status(200).json({ is_active, selected_coin_data, game_coins, game_period, is_shown, history });
  } catch (e) {
    logger.error(`SHORT_GAME_CONTROLLER: Error while retrieving game data for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const setShortGameData = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`SHORT_GAME_CONTROLLER: User ${req.user.telegramId} setting data for short game`);
  try {
    const canCreateOrUpdate = getActiveGameTimePeriod();
    if (!canCreateOrUpdate) {
      logger.warn(`SHORT_GAME_CONTROLLER: Not the right time to pick a coin for user ${req.user.telegramId}`);
      return next(ApiError.BadRequest('Now is not the time to pick a coin!'));
    }
    const user = req.user;
    const coin_id = req.body.coin_id;
    const coin_list_value = await CoinListService.findOneByCoinId(coin_id);
    const { id } = coin_list_value.toJSON();

    const isShortGameCoin = await ShortGameCoinsService.findCoinByCoinListId(id);
    if (!isShortGameCoin) {
      logger.warn(`SHORT_GAME_CONTROLLER: Coin does not exist in short game for user ${req.user.telegramId}`);
      return next(ApiError.BadRequest('Coin doesnt exist in short game'));
    }

    const [updatedCount] = await ShortGameDataService.updateUserGameDataByUser({
      user_id: user.id,
      coin_list_id: id
    });

    if (updatedCount === 0) {
      await ShortGameDataService.createUserData({
        user_id: user.id,
        coin_list_id: id
      });
    }

    logger.info(`SHORT_GAME_CONTROLLER: Game data set for user ${user.telegramId} ${user.firstName}`);
    logger.info(`🩳Short. \nUserid: ${user.telegramId}, name: ${user.firstName}\ncoin_id: ${coin_id} ${TELEGRAM_LOGGER_KEY}`);
    return res.status(201).json({ success: true });
  } catch (e) {
    logger.error(`SHORT_GAME_CONTROLLER: Error setting game data for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const getRewardsByShortGame = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`SHORT_GAME_CONTROLLER: User ${req.user.telegramId} retrieving rewards for short game`);
  const transaction = await sequelize.transaction();

  try {
    const user = req.user;
    const unpaidGames = await ShortGameDataService.getUnpaidUserGames(user.id, transaction);

    if (unpaidGames.length === 0) {
      await transaction.commit();
      logger.info(`SHORT_GAME_CONTROLLER: No unpaid games for user ${req.user.telegramId}`);
      return res.status(200).json({ totalRewards: 0, rewardByPlaces: [] });
    }

    const places = unpaidGames.map(unpaidGame => unpaidGame.place);
    const minUserLevel = Math.min(user.miningLevel, user.secretLevel, user.luckLevel, user.timeLevel);

    const { totalRewards, rewardByPlaces } = getRewardsForShortGame(minUserLevel, places);
    user.coins += totalRewards;
    await user.save({ transaction });
    await ShortGameDataService.updateUnpaidGamesToPaid(user.id, transaction);

    await transaction.commit();
    logger.info(`SHORT_GAME_CONTROLLER: Rewards processed for user ${req.user.telegramId}`);
    return res.status(200).json({ totalRewards, rewardByPlaces });
  } catch (e) {
    await transaction.rollback();
    logger.error(`SHORT_GAME_CONTROLLER: Error retrieving rewards for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};
