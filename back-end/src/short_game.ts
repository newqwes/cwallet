import 'dotenv/config';
import { getHistoricalChart } from './get_coin_info';
import CoinListService from './services/coinListService';
import ShortGameCoinsService from './services/shortGameCoinsService';
import ShortGameDataService from './services/shortGameDataServices';
import dotenv from 'dotenv';
dotenv.config();

const coins_limit = process.env.SHORT_GAME_COINS_LIMIT;

export async function shortGame() {
  try {
    let currentUTCHours = new Date().getUTCHours();
    console.log('UTC0 Time:', currentUTCHours);
    if (currentUTCHours === 0) {
      const coins_exist = await ShortGameCoinsService.findCoins();
      const coins_exist_json = coins_exist.map((el) => el.toJSON());
      const random_coins_array =
        await CoinListService.getRandomCoins(+coins_limit);
      let i = 0;
      if (coins_exist_json.length) {
        //Перед обновлением
        //1. Удаляем все записи из таблицы short_game_data с game_ended = true. Это старые данные , они нам не нужны.
        await ShortGameDataService.deleteEndedGames();

        //2. Cмотрим на положение монет и проставляем места в таблице short_game_data и мееняем флаг game_ended = true
        const coins_game_result = await ShortGameCoinsService.findSortCoins();

        let place = 1;
        for (let el of coins_game_result) {
          const { coin_list_id } = el.toJSON();
          await ShortGameDataService.updateUserPlace({
            coin_list_id,
            place,
          });
          place++;
        }
      }

      for (let el of random_coins_array) {
        const { id, current_price } = el.toJSON();
        await CoinListService.updateHCFlag(id, true);
        if (coins_exist_json.length) {
          //Обновляем монеты
          await ShortGameCoinsService.updateCoinListForShortGame(
            {
              coin_list_id: id,
              start_price: current_price,
              volatility: 0,
            },
            coins_exist_json[i]?.id
          );
          i++;
        } else {
          await ShortGameCoinsService.createNewListForShortGame({
            coin_list_id: id,
            start_price: current_price,
            volatility: 0,
          });
        }
      }

      //Запускаем обновлениее графиков для этих монет, таблица coinList
      await getHistoricalChart();
      //Снимаем галочки с обновления всех графиков (не окончательный вариант, подумать как лучше сделать)
      await CoinListService.updateAllHCFlags();
    } else {
      const coins_array_short_game = await ShortGameCoinsService.findCoins();
      if (!coins_array_short_game.length) {
        console.log('Монет для игры не существует, обновлять нечего');
        return;
      } else {
        console.log('Обнавляем инфу по монетам');
        for (let el of coins_array_short_game) {
          const { id, coin_list_id, start_price } = el.toJSON();
          const coin_info_from_coin_list =
            await CoinListService.findOneById(coin_list_id);
          const { current_price } = coin_info_from_coin_list.toJSON();

          //Переписать, не знаю как правильно считать валотильность
          const volatility =
            ((current_price - start_price) / start_price) * 100;
          await ShortGameCoinsService.updateCoinInfoShortGame({
            volatility,
            id,
          });
        }
      }
    }
  } catch (error) {
    console.error('Ошибка запроса:', {
      msg: error.message,
      stack: error.stack,
    });
    if (error.response) {
      console.error('Статус:', error.response.status);
      console.error('Данные ответа:', error.response.data);
    }
  }
}
