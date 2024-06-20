import ShortGameData from '../database/models/shortGameData';
import createResponse from '../utils/createResponse';
import {
  ShortGameDataInitDataModel,
  ShortGameUpdatePlaceDataModel,
} from '../models';

class ShortGameDataService {
  async createUserData(defaults: ShortGameDataInitDataModel) {
    try {
      return await ShortGameData.create({
        ...defaults,
      });
    } catch (error) {
      console.log('error', error);
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
      return results; // Это вернет результат или пустой массив, если записи не найдены
    } catch (error) {
      console.error('Error fetching game history:', error); // Лучше использовать console.error для ошибок
      createResponse(404, 'Server Error historyByUserId', error);
      return null; // Явно возвращаем null, чтобы указать на ошибку
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
        }
      );
    } catch (error) {
      console.log('error', error);
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
        }
      );
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error update', error);
    }
  }

  async getUnpaidUserGames(user_id: string, transaction = null) {
    try {
      return await ShortGameData.findAll(
        {
          where: { user_id, game_ended: true, is_paid: false },
          transaction
        }
      );
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error update', error);
    }
  }

  async updateUnpaidGamesToPaid(user_id: string, transaction = null) {
    try {
      const [updatedCount] = await ShortGameData.update(
        { is_paid: true },
        { where: { user_id, game_ended: true, is_paid: false }, transaction },
      );
      console.log(`Updated ${updatedCount} games to paid.`);
      return updatedCount;
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error update', error);
      return 0;
    }
  }
}

export default new ShortGameDataService();
