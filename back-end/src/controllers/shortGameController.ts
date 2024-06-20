import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';
import CoinListService from '../services/coinListService';
import ShortGameCoinsService from '../services/shortGameCoinsService';
import ShortGameDataService from '../services/shortGameDataServices';
import ApiError from '../exceptions/apiError';
import { getActiveGameTimePeriod, getGameTimePeriod } from "../utils/getProgressTimePeriod";
import sequelize from "../database";
import { getRewardsForShortGame } from "../utils/rewardsForShortGame";

export const getDataByShortGame = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);
    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }
    const game_coins = [];
    const result = await ShortGameCoinsService.findSortCoins();

    for (let el of result) {
      const { coin_list_id, start_price, volatility } = el.toJSON();
      const coin_info = await CoinListService.findOneById(coin_list_id);
      const coin_info_json = await coin_info.toJSON();
      game_coins.push({
        coin_list_id,
        start_price,
        volatility,
        coin_info: coin_info_json,
      });
    }
    const selected_coin_data = await ShortGameDataService.findActiveGameByUserId(user.id);
    let is_shown = true;
    if (selected_coin_data) {
      is_shown = selected_coin_data.is_shown;
      selected_coin_data.is_shown = true;
      await selected_coin_data.save();
    }

    const history = await ShortGameDataService.historyByUserId(user.id);
    const is_active = getActiveGameTimePeriod(); // Time when users can chose coin
    const game_period = getGameTimePeriod();

    return res.status('200').json({ is_active, selected_coin_data, game_coins, game_period, is_shown, history });
  } catch (e) {
    next(e);
  }
};

export const setShortGameData = async (req: any, res: any, next: any) => {
  try {
    const canCreateOrUpdate = getActiveGameTimePeriod();
    if (!canCreateOrUpdate) {
      return next(ApiError.BadRequest('Now is not the time to pick a coin!'));
    }

    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);
    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const coin_id = req.body.coin_id;
    const coin_list_value = await CoinListService.findOneByCoinId(coin_id);
    const { id } = coin_list_value.toJSON();

    const isShortGameCoin = await ShortGameCoinsService.findCoinByCoinListId(id);
    if (!isShortGameCoin) {
      return next(ApiError.BadRequest('Coin doesnt exist in short game'));
    }

    const [updatedCount] = await ShortGameDataService.updateUserGameDataByUser({
      user_id: user.id,
      coin_list_id: id,
    });

    if (updatedCount === 0) {
      await ShortGameDataService.createUserData({
        user_id: user.id,
        coin_list_id: id,
      })
    }

    return res.status('201').json({ success: true });
  } catch (e) {
    next(e);
  }
};

export const getRewardsByShortGame = async (req: any, res: any, next: any) => {
  const transaction = await sequelize.transaction();

  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id, transaction);
    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const unpaidGames = await ShortGameDataService.getUnpaidUserGames(user.id, transaction);

    if (unpaidGames.length === 0) {
      await transaction.commit();
      return res.status(200).json({ totalRewards: 0, rewardByPlaces: [] });
    }

    const places = unpaidGames.map(unpaidGame => unpaidGame.place);
    const minUserLevel = Math.min(user.miningLevel, user.secretLevel, user.luckLevel, user.timeLevel);

    const { totalRewards, rewardByPlaces } = getRewardsForShortGame(minUserLevel, places);
    user.coins += totalRewards;
    await user.save({ transaction });
    await ShortGameDataService.updateUnpaidGamesToPaid(user.id, transaction);

    await transaction.commit();
    return res.status(200).json({ totalRewards, rewardByPlaces });
  } catch (e) {
    await transaction.rollback();
    next(e);
  }
};
