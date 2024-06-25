import LongGame from '../database/models/longGame';
import createResponse from '../utils/createResponse';
import { LongGameInitDataModel } from '../models';
import { logger } from '../logger';

class LongGameService {
  async findOneNoteLongGame(
    user_id: string,
    coin_list_id: string,
    start_date: string
  ) {
    try {
      return await LongGame.findOne({
        where: { user_id, coin_list_id, start_date }
      });
    } catch (error) {
      createResponse(404, 'Server Error findOneNoteLongGame', error);
    }
  }

  async create(defaults: LongGameInitDataModel) {
    try {
      return await LongGame.create({
        ...defaults
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error create', error);
    }
  }
}

export default new LongGameService();
