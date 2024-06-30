import ShortGameData from '../database/models/shortGameData';
import createResponse from '../utils/createResponse';
import {
  ShortGameDataInitDataModel,
  ShortGameUpdatePlaceDataModel,
} from '../models';
import { logger } from '../logger';
import sequelize from '../database';

class ShortGameDataService {
  async createUserData(defaults: ShortGameDataInitDataModel) {
    try {
      return await ShortGameData.create({
        ...defaults,
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error create', error);
    }
  }

  async findActiveGameByUserId(user_id: string) {
    try {
      return await ShortGameData.findOne({
        where: { user_id, game_ended: false },
      });
    } catch (error) {
      createResponse(404, 'Server Error findActiveGameByUserId', error);
    }
  }

  async historyByUserId(user_id: string) {
    try {
      const results = await ShortGameData.findAll({
        where: { user_id, game_ended: true },
      });
      return results;
    } catch (error) {
      logger.error('Error fetching game history: ' + JSON.stringify(error));
      createResponse(404, 'Server Error historyByUserId', error);
      return null;
    }
  }

  async findActiveGames() {
    try {
      return await ShortGameData.findAll({
        where: { game_ended: false },
      });
    } catch (error) {
      createResponse(404, 'Server Error findActiveGames', error);
    }
  }

  async findAllGroupEndedGames() {
    try {
      return await ShortGameData.findAll({
        where: { game_ended: true },
        attributes: [
          'user_id',
          [sequelize.fn('AVG', sequelize.col('place')), 'average_place'],
          [sequelize.fn('AVG', sequelize.col('volatility_result')), 'average_volatility_result'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'games_count'],
        ],
        group: ['user_id'],
      });
    } catch (error) {
      createResponse(404, 'Server Error findActiveGames', error);
    }
  }

  async findProgressGames() {
    try {
      return await ShortGameData.findAll({
        where: { game_ended: false, in_progress: true },
      });
    } catch (error) {
      createResponse(404, 'Server Error findProgressGames', error);
    }
  }

  async updateUserGameData(defaults: ShortGameUpdatePlaceDataModel) {
    try {
      const { coin_list_id, ...values } = defaults;
      return await ShortGameData.update(
        values,
        {
          where: { coin_list_id, game_ended: false },
        },
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update', error);
    }
  }

  async updateUserGameDataByUser(defaults: ShortGameUpdatePlaceDataModel) {
    try {
      const { user_id, ...values } = defaults;
      return await ShortGameData.update(
        values,
        {
          where: { user_id, game_ended: false, in_progress: false },
        },
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update', error);
    }
  }

  async getUnpaidUserGames(user_id: string, transaction = null) {
    try {
      return await ShortGameData.findAll(
        {
          where: { user_id, game_ended: true, is_paid: false },
          transaction,
        },
      );
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update', error);
    }
  }

  async updateUnpaidGamesToPaid(user_id: string, transaction = null) {
    try {
      const [updatedCount] = await ShortGameData.update(
        { is_paid: true },
        { where: { user_id, game_ended: true, is_paid: false }, transaction },
      );
      logger.info(`Updated ${updatedCount} games to paid.`);
      return updatedCount;
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update', error);
      return 0;
    }
  }
}

export default new ShortGameDataService();
