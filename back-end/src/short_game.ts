import 'dotenv/config';
import { getCoinsInfo } from './get_coin_info';
import CoinListService from './services/coinListService';
import ShortGameCoinsService from './services/shortGameCoinsService';
import ShortGameDataService from './services/shortGameDataServices';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const coins_limit = Number(process.env.SHORT_GAME_COINS_LIMIT || 6);

const calcVolatility = (startPrice: number, currentPrice: number): number => {
  return ((currentPrice - startPrice) / startPrice) * 100;
};

const updateInfoGameCoins = async (updateStartPrice: boolean) => {
  const gameCoins = await ShortGameCoinsService.findCoins();
  if (!gameCoins.length) {
    logger.warn('There are no coins for the game, there is nothing to update');
    return;
  } else {
    logger.info('Updating information on the coins');
    for (let gameCoin of gameCoins) {
      const { id, coin_list_id, start_price } = gameCoin.toJSON();
      const currentCoinInfo = await CoinListService.findOneById(coin_list_id);
      const { current_price } = currentCoinInfo.toJSON();

      await ShortGameCoinsService.updateCoinInfoShortGame({
        volatility: calcVolatility(start_price, current_price),
        id,
        ...(updateStartPrice ? { volatility: 0, start_price: current_price } : {})
      });
    }
  }
};

export const startEndShortGame = async () => {
  try {
    await getCoinsInfo();
    await updateInfoGameCoins(false);
    const gameCoins = await ShortGameCoinsService.findSortCoins();
    const activeGames = await ShortGameDataService.findActiveGames();

    const canUpdateGameData = activeGames && gameCoins && activeGames.length > 0 && gameCoins.length > 0;
    if (canUpdateGameData) {
      await CoinListService.updateAllHCFlags();
      for (let activeGame of activeGames) {
        const { coin_list_id } = activeGame.toJSON();
        let place = 0;
        let volatility_result = 0;
        const currentCoin = gameCoins.find(((gameCoin, index) => {
          const found = gameCoin.coin_list_id === coin_list_id;
          if (found) {
            place = index + 1;
          }
          return found;
        }));
        if (currentCoin && currentCoin.start_price) {
          volatility_result = currentCoin.volatility;
        }
        await ShortGameDataService.updateUserGameData({
          coin_list_id,
          place,
          game_ended: true,
          volatility_result,
          is_shown: false,
          in_progress: false
        });
      }
    }

    await ShortGameCoinsService.deleteAllCoins();
    const coinsForShorGame = await CoinListService.getCoinsForShortGame(coins_limit);

    for (let el of coinsForShorGame) {
      const { id, current_price } = el.toJSON();
      await CoinListService.updateHCFlag(id, true);
      await ShortGameCoinsService.createNewListForShortGame({
        coin_list_id: id,
        start_price: current_price,
        volatility: 0
      });
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
  }
};

export const progressShortGame = async () => {
  try {
    await getCoinsInfo();
    await updateInfoGameCoins(true);
    const activeGames = await ShortGameDataService.findActiveGames();

    if (activeGames && activeGames.length > 0) {
      for (let activeGame of activeGames) {
        const { coin_list_id } = activeGame.toJSON();
        await ShortGameDataService.updateUserGameData({
          coin_list_id,
          place: 1,
          volatility_result: 0,
          is_shown: false,
          in_progress: true
        });
      }
    }

  } catch (error) {
    logger.error(JSON.stringify(error));
  }
};

export const checkProgressShortGame = async () => {
  try {
    await getCoinsInfo();
    await updateInfoGameCoins(false);
    const progressGames = await ShortGameDataService.findProgressGames();
    const gameCoins = await ShortGameCoinsService.findSortCoins();

    const canUpdateGameData = progressGames && gameCoins && progressGames.length > 0 && gameCoins.length > 0;
    if (canUpdateGameData) {
      for (let progressGame of progressGames) {
        const { coin_list_id } = progressGame.toJSON();
        let place = 0;
        let volatility_result = 0;
        const currentCoin = gameCoins.find(((gameCoin, index) => {
          const found = gameCoin.coin_list_id === coin_list_id;
          if (found) {
            place = index + 1;
          }
          return found;
        }));
        if (currentCoin && currentCoin.start_price) {
          volatility_result = currentCoin.volatility;
        }
        await ShortGameDataService.updateUserGameData({
          coin_list_id,
          place,
          volatility_result,
          is_shown: false
        });
      }
    }

  } catch (error) {
    logger.error(JSON.stringify(error));
  }
};
