import TasksList from '../database/models/tasksList';
import createResponse from '../utils/createResponse';

class TasksListService {
  async findAll(): Promise<TasksList[]> {
    try {
      return await TasksList.findAll();
    } catch (error) {
      createResponse(404, 'Server Error findAll', error);
    }
  }

  async findOneById(id: number): Promise<TasksList> {
    try {
      return await TasksList.findOne({ where: { id } });
    } catch (error) {
      createResponse(404, 'Server Error findOneById', error);
    }
  }

  async findOneByTaskName(task_name: string): Promise<TasksList> {
    try {
      return await TasksList.findOne({ where: { task_name } });
    } catch (error) {
      createResponse(404, 'Server Error findOneByTaskName', error);
    }
  }
}

export default new TasksListService();
