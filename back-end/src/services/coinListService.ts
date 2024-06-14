import CoinList from '../database/models/coinList';
import createResponse from '../utils/createResponse';
import { CoinListInitDataModel } from '../models';

class CoinListService {
  async findOneByCoinId(coin_id: string): Promise<CoinList> {
    try {
      return await CoinList.findOne({
        where: { coin_id },
      });
    } catch (error) {
      createResponse(404, 'Server Error findOneByCoinId', error);
    }
  }

  async create(defaults: CoinListInitDataModel) {
    try {
      const { coin_id, symbol, name, image_link, current_price, last_updated } =
        defaults;

      return await CoinList.create({
        coin_id,
        symbol,
        name,
        image_link,
        current_price,
        last_updated,
      });
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error create', error);
    }
  }

  async update(defaults: CoinListInitDataModel) {
    try {
      const { coin_id, symbol, name, image_link, current_price, last_updated } =
        defaults;

      return await CoinList.update(
        {
          coin_id,
          symbol,
          name,
          image_link,
          current_price,
          last_updated,
        },
        {
          where: { coin_id },
        }
      );
    } catch (error) {
      createResponse(404, 'Server Error update', error);
    }
  }

  async updateHC(hc_data: Array<Array<string>>, coin_id: string) {
    try {
      return await CoinList.update(
        {
          historical_chart_prices: hc_data,
        },
        {
          where: { coin_id },
        }
      );
    } catch (error) {
      createResponse(404, 'Server Error updateHC', error);
    }
  }

  async findAllHCActiveCoins() {
    try {
      return await CoinList.findAll({
        where: { historical_chart_active: true },
      });
    } catch (error) {
      createResponse(404, 'Server Error findAllHCActiveCoins', error);
    }
  }
}

export default new CoinListService();
