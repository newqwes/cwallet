import TinderGame from '../database/models/tinderGame';
import createResponse from '../utils/createResponse';
import { Op } from 'sequelize';
import { logger } from '../logger';

class TinderGameService {
  async findOrCreate(
    createData: Record<string, any>
  ): Promise<{ tinderGame: TinderGame; created: boolean }> {
    try {
      const today = new Date();
      const todayStart = new Date(today.setHours(0, 0, 0, 0)); // Начало сегодняшнего дня
      const todayEnd = new Date(today.setHours(23, 59, 59, 999)); // Конец сегодняшнего дня

      const [tinderGame, created] = await TinderGame.findOrCreate({
        where: {
          user_id: createData.user_id,
          game_period: {
            [Op.between]: [todayStart, todayEnd], // Проверка на совпадение даты
          },
          game_ended: false,
        },
        defaults: createData,
      });
      return { tinderGame, created };
    } catch (error) {
      console.log('error', error);
      logger.error(JSON.stringify(error));
      throw createResponse(404, 'Server Error findOrCreate', error);
    }
  }
}

export default new TinderGameService();
