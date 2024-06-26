import ApiError from '../exceptions/apiError';
import UserTasksService from '../services/userTasksService';
import TasksListService from '../services/tasksListService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

export const setTask = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`SET_TASK_CONTROLLER: Attempting to set task for user ${req.user.telegramId}`);
  try {
    const user = req.user;

    const task_info = await TasksListService.findOneByTaskName(req.body?.task_name);
    if (!task_info) {
      logger.warn(`SET_TASK_CONTROLLER: Task does not exist - ${req.body?.task_name}`);
      return next(ApiError.BadRequest('Task doesnt exist'));
    }

    const { id, reward } = task_info.toJSON();

    const createData = {
      user_id: user.id,
      tasks_list_id: id
    };
    const user_task_info = await UserTasksService.findOrCreate(createData);

    if (user_task_info.userTask.is_claimed) {
      logger.warn(`SET_TASK_CONTROLLER: User ${req.user.telegramId} already claimed reward for this task`);
      return next(ApiError.BadRequest('User got reward for this task'));
    }

    if (!user_task_info.created) {
      user_task_info.userTask.is_claimed = true;
      await user_task_info.userTask.save();
      user.coins += reward;
      await user.save();
    }

    logger.info(`SET_TASK_CONTROLLER: Task set and reward claimed for user ${req.user.telegramId}`);
    return res.status(201).json({ user });
  } catch (e) {
    logger.error(`SET_TASK_CONTROLLER: Error setting task for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const getUserTasksState = async (
  req: CustomRequest, res: CustomResponse, next: CustomNextFunction
) => {
  logger.info(`GET_USER_TASKS_STATE_CONTROLLER: Retrieving task state for user ${req.user.telegramId}`);
  try {
    const user = req.user;
    const user_task_info = await UserTasksService.findAllByUserId(user.id);
    const task_list_array = await TasksListService.findAll();
    const result = {
      tasks: task_list_array,
      task_statuses: user_task_info
    };

    logger.info(`GET_USER_TASKS_STATE_CONTROLLER: Task state retrieved for user ${req.user.telegramId}`);
    return res.status(200).json({ result });
  } catch (e) {
    logger.error(`GET_USER_TASKS_STATE_CONTROLLER: Error retrieving task state for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};
