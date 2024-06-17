import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';

import CoinListService from '../services/coinListService';
import ShortGameCoinsService from '../services/shortGameCoinsService';
import ShortGameDataService from '../services/shortGameDataServices';
import ApiError from '../exceptions/apiError';
import formatDate from '../utils/longGameFormatDate';

export const getSortedDataByShortGame = async (
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
    const final_result = [];
    const result = await ShortGameCoinsService.findSortCoins();
    for (let el of result) {
      const { coin_list_id, start_price, volatility } = el.toJSON();
      const coin_info = await CoinListService.findOneById(coin_list_id);
      const coin_info_json = await coin_info.toJSON();
      final_result.push({
        coin_list_id,
        start_price,
        volatility,
        coin_info: coin_info_json,
      });
    }

    return res.status('200').json({ final_result });
  } catch (e) {
    next(e);
  }
};

export const setShortGameData = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);
    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const coin_id = req.body.coin_id;
    const coin_liist_value = await CoinListService.findOneByCoinId(coin_id);
    const { id } = coin_liist_value.toJSON();

    const isShortGameCoin =
      await ShortGameCoinsService.findCoinByCoinListId(id);
    if (!isShortGameCoin) {
      return next(ApiError.BadRequest('Coin doesnt exist in short game'));
    }
    const formated_current_date = formatDate(new Date());
    const result = await ShortGameDataService.createUserData({
      user_id: user.id,
      coin_list_id: id,
      game_period: formated_current_date,
    });

    return res.status('201').json({ result });
  } catch (e) {
    next(e);
  }
};

export const getShortGameResultData = async (req: any, res: any, next: any) => {
  try {
    const result = await ShortGameDataService.getResult();
    return res.status('200').json({ result });
  } catch (e) {
    next(e);
  }
};
