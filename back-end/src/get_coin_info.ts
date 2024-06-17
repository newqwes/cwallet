import 'dotenv/config';
import axios from 'axios';
import createOptionsRequest from './utils/createCGOptionsRequest';
import CoinListService from './services/coinListService';
import dotenv from 'dotenv';
dotenv.config();

const CG_domain = process.env.CG_DOMAIN;
const CG_HC_days = 7; //data up to number of days ago (for example: 7)
const CG_HC_interval = 'daily'; //data interval, leave empty for auto granularity Possible value: daily

export async function getCoinsInfo() {
  try {
    console.log('Стартовал процесс получения данных');
    const options = createOptionsRequest(
      'GET',
      `https://${CG_domain}/api/v3/coins/markets?vs_currency=usd`
    );
    const response = await axios.request(options);

    for (let coin_el of response.data) {
      const request_data = {
        coin_id: coin_el.id,
        symbol: coin_el.symbol,
        name: coin_el.name,
        image_link: coin_el.image,
        current_price: coin_el.current_price,
        last_updated: coin_el.last_updated,
        market_cap_rank: coin_el.market_cap_rank,
        market_cap: coin_el.market_cap,
      };

      const getCoin = await CoinListService.findOneByCoinId(
        request_data.coin_id
      );
      if (getCoin) {
        await CoinListService.update(request_data);
      } else {
        await CoinListService.create(request_data);
      }
    }
    console.log('Процесс получения данных завершен');
  } catch (error) {
    console.error('Ошибка запроса:', error.message);
    if (error.response) {
      console.error('Статус:', error.response.status);
      console.error('Данные ответа:', error.response.data);
    }
  }
}

export async function getHistoricalChart() {
  try {
    console.log('Стартовал процесс получения данных Historical Chart');
    const active_coins = await CoinListService.findAllHCActiveCoins();
    if (!active_coins.length) {
      console.log('Активыне монеты отсутсвуют');
      return;
    }

    for (let coin_el of active_coins) {
      const coin_el_json = coin_el.toJSON();
      const options = createOptionsRequest(
        'GET',
        `https://${CG_domain}/api/v3/coins/${coin_el_json.coin_id}/market_chart?vs_currency=usd&days=${CG_HC_days}&interval=${CG_HC_interval}`
      );

      const response = await axios.request(options);
      await CoinListService.updateHC(
        response.data.prices,
        coin_el_json.coin_id
      );
    }
    console.log('Процесс получения данных Historical Chart завершен');
  } catch (error) {
    console.error('Ошибка запроса:', error.message);
    if (error.response) {
      console.error('Статус:', error.response.status);
      console.error('Данные ответа:', error.response.data);
    }
  }
}
