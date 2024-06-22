import ApiError from '../exceptions/apiError';
import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';
import UserTasksService from '../services/userTasksService';
import TasksListService from '../services/tasksListService';
import { NextFunction } from 'express';

export const setTask = async (req: any, res: any, next: NextFunction) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    const { task_name } = req.body?.task_info;

    const task_info = await TasksListService.findOneByTaskName(task_name);
    if (!task_info) {
      return next(ApiError.BadRequest('Task doesnt exist'));
    }

    const { id, reward } = task_info.toJSON();
    const user_exist = await UserTasksService.findOne(user.id, id);

    if (user_exist.is_claimed === 2) {
      return next(ApiError.BadRequest('User got reward fot this task'));
    }

    user_exist.is_claimed += 1;
    await user_exist.save();

    if (user_exist.is_claimed === 2) {
      user.coins += reward;
      await user.save();
    }

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const getUserTasksState = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    let user_task_info = await UserTasksService.findAllByUserId(user.id);
    if (!user_task_info.length) {
      const task_list_array = await TasksListService.findAll();
      for (let el of task_list_array) {
        const { id } = el.toJSON();
        const createData = {
          user_id: user.id,
          tasks_list_id: id,
        };

        await UserTasksService.findOrCreate(createData);
      }
      user_task_info = await UserTasksService.findAllByUserId(user.id);
    }

    const result_array = [];
    for (let el of user_task_info) {
      const { tasks_list_id, is_claimed } = el.toJSON();
      const task_info = await TasksListService.findOneById(tasks_list_id);
      const { task_name, reward } = task_info.toJSON();
      result_array.push({
        task_name,
        reward,
        is_claimed,
      });
    }
    return res.status(200).json({ result_array });
  } catch (e) {
    next(e);
  }
};
