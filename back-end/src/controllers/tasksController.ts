import ApiError from '../exceptions/apiError';
import UserTasksService from '../services/userTasksService';
import TasksListService from '../services/tasksListService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

export const setTask = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;

    const task_info = await TasksListService.findOneByTaskName(
      req.body?.task_name
    );
    if (!task_info) {
      return next(ApiError.BadRequest('Task doesnt exist'));
    }

    const { id, reward } = task_info.toJSON();

    const createData = {
      user_id: user.id,
      tasks_list_id: id
    };
    const user_task_info = await UserTasksService.findOrCreate(createData);

    if (user_task_info.userTask.is_claimed) {
      return next(ApiError.BadRequest('User got reward fot this task'));
    }

    if (!user_task_info.created) {
      user_task_info.userTask.is_claimed = true;
      await user_task_info.userTask.save();
      user.coins += reward;
      await user.save();
    }

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const getUserTasksState = async (
  req: CustomRequest, res: CustomResponse, next: CustomNextFunction
) => {
  try {
    const user = req.user;
    const user_task_info = await UserTasksService.findAllByUserId(user.id);
    const task_list_array = await TasksListService.findAll();
    const result = {
      tasks: task_list_array,
      task_statuses: user_task_info
    };
    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};
