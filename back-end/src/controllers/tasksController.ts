import ApiError from '../exceptions/apiError';
import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';
import TasksService from '../services/tasksService';
import { NextFunction } from 'express';

export const setTask = async (req: any, res: any, next: NextFunction) => {
  try {
    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    //task_state - если пользователь кликнул на таску отправляется task_state = 1
    //Если пользователь кликнул на забрать награду за таску отправляется task_state = 2
    const { task_name, task_state } = req.body?.task_info;

    // Список наград
    const awards_list = {
      subscribe_to_channel: 20,
      subscribe_to_chat: 30,
      subscribe_to_x: 40,
      invite_frend: 50,
      invate_three_friends: 200,
      accumulate_30000_coins: 500,
    };

    if (!awards_list.hasOwnProperty(task_name)) {
      return next(ApiError.BadRequest('The task_name is not valid'));
    }

    const user_exist = await TasksService.findOneByUserId(user.id);
    const user_exit_json = user_exist.toJSON();
    const updateData = { [task_name]: task_state };

    if (user_exist) {
      if (user_exit_json[task_name] === 2) {
        return next(ApiError.BadRequest('User got reward fot this task'));
      }
      await TasksService.update(user.id, updateData);
    } else {
      await TasksService.create({
        user_id: user.id,
        ...updateData,
      });
    }

    if (task_state === 2) {
      user.coins += awards_list[task_name];
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

    const user_result = await TasksService.findOneByUserId(user.id);
    return res.status(200).json({ user_result });
  } catch (e) {
    next(e);
  }
};
