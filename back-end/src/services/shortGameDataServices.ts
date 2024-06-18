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

  async findOneByUserId(user_id: string) {
    try {
      return await ShortGameData.findOne({
        where: { user_id },
      });
    } catch (error) {
      createResponse(404, 'Server Error findOneByCoinId', error);
    }
  }

  async updateUserPlace(defaults: ShortGameUpdatePlaceDataModel) {
    try {
      const { coin_list_id, place } = defaults;
      return await ShortGameData.update(
        {
          game_ended: true,
          place,
        },
        {
          where: { coin_list_id },
        }
      );
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error update', error);
    }
  }

  async getResult() {
    try {
      return await ShortGameData.findAll({
        where: { game_ended: true },
      });
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error getResult', error);
    }
  }

  async deleteEndedGames() {
    try {
      const deletedCount = await ShortGameData.destroy({
        where: {
          game_ended: true,
        },
      });
      return deletedCount;
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error getResult', error);
    }
  }
}

export default new ShortGameDataService();
