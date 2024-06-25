import ShortGameCoins from '../database/models/shortGameCoins';
import createResponse from '../utils/createResponse';
import {
  ShortGameCoinsInitDataModel,
  ShortGameCoinsUpdateVolatility
} from '../models';
import { logger } from '../logger';

class ShortGameCoinsService {
  async findCoinByCoinListId(coin_list_id: string) {
    try {
      return await ShortGameCoins.findOne({
        where: { coin_list_id }
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error findAll', error);
    }
  }

  async findCoins() {
    try {
      return await ShortGameCoins.findAll();
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error findAll', error);
    }
  }

  async findSortCoins() {
    try {
      return await ShortGameCoins.findAll({
        order: [['volatility', 'DESC']]
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error findAll', error);
    }
  }

  async createNewListForShortGame(defaults: ShortGameCoinsInitDataModel) {
    try {
      return await ShortGameCoins.create({
        ...defaults
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error create', error);
    }
  }

  async updateCoinListForShortGame(
    defaults: ShortGameCoinsInitDataModel,
    id: string
  ) {
    try {
      return await ShortGameCoins.update(
        {
          ...defaults
        },
        {
          where: { id }
        }
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update coin list short game', error);
    }
  }

  async updateCoinInfoShortGame(defaults: ShortGameCoinsUpdateVolatility) {
    const { volatility, id } = defaults;
    try {
      return await ShortGameCoins.update(
        {
          volatility
        },
        {
          where: { id }
        }
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update coin info short game', error);
    }
  }

  async deleteAllCoins() {
    try {
      return await ShortGameCoins.destroy({ where: {} });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update coin info short game', error);
    }
  }
}

export default new ShortGameCoinsService();
