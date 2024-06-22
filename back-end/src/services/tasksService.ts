import Tasks from '../database/models/tasks';
import createResponse from '../utils/createResponse';

class TasksService {
  async findOneByUserId(user_id: string): Promise<Tasks> {
    try {
      return await Tasks.findOne({
        where: { user_id },
      });
    } catch (error) {
      createResponse(404, 'Server Error findOneByUserId', error);
    }
  }

  async create(createData: Record<string, any>): Promise<Tasks> {
    try {
      return await Tasks.create(createData);
    } catch (error) {
      console.log('error', error);
      createResponse(404, 'Server Error create', error);
    }
  }

  async update(
    user_id: string,
    updateData: Record<string, any>
  ): Promise<number> {
    try {
      const [affectedCount] = await Tasks.update(updateData, {
        where: { user_id },
      });
      return affectedCount;
    } catch (error) {
      createResponse(404, 'Server Error update', error);
    }
  }
}

export default new TasksService();
