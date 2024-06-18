import { Op } from 'sequelize';
import CoinList from '../database/models/coinList';
import createResponse from '../utils/createResponse';
import { CoinListInitDataModel } from '../models';
import sequelize from '../database';
import ManualCoin from "../database/models/manualCoin";

class CoinListService {
  async findOneById(id: string): Promise<CoinList> {
    try {
      return await CoinList.findOne({
        where: { id },
      });
    } catch (error) {
      createResponse(404, 'Server Error findOneByCoinId', error);
    }
  }

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
      const {
        coin_id,
        symbol,
        name,
        image_link,
        current_price,
        last_updated,
        market_cap_rank,
        market_cap,
      } = defaults;

      return await CoinList.create({
        coin_id,
        symbol,
        name,
        image_link,
        current_price,
        last_updated,
        market_cap_rank,
        market_cap,
      });
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error create', error);
    }
  }

  async update(defaults: CoinListInitDataModel) {
    try {
      const {
        coin_id,
        symbol,
        name,
        image_link,
        current_price,
        last_updated,
        market_cap_rank,
        market_cap,
      } = defaults;

      return await CoinList.update(
        {
          coin_id,
          symbol,
          name,
          image_link,
          current_price,
          last_updated,
          market_cap_rank,
          market_cap,
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

  async getRandomCoins(limit_value: number) {
    try {
      return await CoinList.findAll({
        order: sequelize.random(),
        limit: limit_value,
      });
    } catch (error) {
      createResponse(404, 'Server Error getRandomCoins', error);
    }
  }

  async getCoinsForShortGame(limit_value: number) {
    try {
      const manualCoins = await ManualCoin.findAll();
      const coinIds = manualCoins.map(coin => coin.coin_id);

      return await CoinList.findAll({
        where: {
          coin_id: {
            [Op.in]: coinIds
          }
        },
        limit: limit_value,
      });
    } catch (error) {
      createResponse(404, 'Server Error getCoinsForShortGame', error);
    }
  }

  async updateHCFlag(id: string, flag: boolean) {
    try {
      return await CoinList.update(
        {
          historical_chart_active: flag,
        },
        { where: { id } }
      );
    } catch (error) {
      createResponse(404, 'Server Error getRandomCoins', error);
    }
  }

  async updateAllHCFlags() {
    try {
      return await CoinList.update(
        {
          historical_chart_active: false,
        },
        {
          where: {}, // Empty where clause to target all rows
        }
      );
    } catch (error) {
      createResponse(404, 'Server Error updateAllHCFlags', error);
    }
  }
}

export default new CoinListService();
