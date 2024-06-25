import UserTasks from '../database/models/userTasks';
import createResponse from '../utils/createResponse';
import { logger } from '../logger';

class UserTasksService {
  async findAllByUserId(user_id: string): Promise<UserTasks[]> {
    try {
      return await UserTasks.findAll({
        where: { user_id }
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error findAllByUserId', error);
    }
  }

  async findOne(user_id: string, tasks_list_id: number): Promise<UserTasks> {
    try {
      return await UserTasks.findOne({
        where: { user_id, tasks_list_id }
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error findAllByUserId', error);
    }
  }

  async findOrCreate(
    createData: Record<string, any>
  ): Promise<{ userTask: UserTasks; created: boolean }> {
    try {
      const [userTask, created] = await UserTasks.findOrCreate({
        where: {
          user_id: createData.user_id,
          tasks_list_id: createData.tasks_list_id
        },
        defaults: createData
      });
      return { userTask, created };
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw createResponse(404, 'Server Error findOrCreate', error);
    }
  }

  async update(
    user_id: string,
    updateData: Record<string, any>
  ): Promise<number> {
    try {
      const [affectedCount] = await UserTasks.update(updateData, {
        where: { user_id }
      });
      return affectedCount;
    } catch (error) {
      logger.error(JSON.stringify(error));
      createResponse(404, 'Server Error update', error);
    }
  }
}

export default new UserTasksService();
