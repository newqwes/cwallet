import ApiError from '../exceptions/apiError';
import UserTasksService from '../services/userTasksService';
import TasksListService from '../services/tasksListService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';
import UserTasks from '../database/models/userTasks';
import TasksList, { task_names } from '../database/models/tasksList';
import UserService from '../services/userService';

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
      tasks_list_id: id,
    };
    const user_task_info = await UserTasksService.findOrCreate(createData);

    if (user_task_info.userTask.is_claimed) {
      logger.warn(`SET_TASK_CONTROLLER: User ${req.user.telegramId} already claimed reward for this task`);
      return next(ApiError.BadRequest('User got reward for this task'));
    }

    if (!user_task_info.created) {

      // TODO: need refactor! custom tasks
      if (task_info.task_name === task_names.invite_three_friends) {
        const referrals = await UserService.findAll({ refParent: user.telegramId });
        if (referrals && referrals.length < 3) {
          logger.warn(`SET_TASK_CONTROLLER: User ${req.user.telegramId} misfired task`);
          return next(ApiError.BadRequest('User misfired task'));
        }
      }
      if (task_info.task_name === task_names.invite_friend) {
        const referrals = await UserService.findAll({ refParent: user.telegramId });
        if (referrals && referrals.length < 2) {
          logger.warn(`SET_TASK_CONTROLLER: User ${req.user.telegramId} misfired task`);
          return next(ApiError.BadRequest('User misfired task'));
        }
      }
      if (task_info.task_name === task_names.accumulate_30000_coins) {
        if (user.coins < 30000) {
          logger.warn(`SET_TASK_CONTROLLER: User ${req.user.telegramId} misfired task`);
          return next(ApiError.BadRequest('User misfired task'));
        }
      }
      // TODO: end

      user_task_info.userTask.is_claimed = true;
      await user_task_info.userTask.save();

      const minUserLevel = Math.min(user.miningLevel, user.secretLevel, user.luckLevel, user.timeLevel);
      user.coins += reward * minUserLevel * 3;
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
  req: CustomRequest, res: CustomResponse, next: CustomNextFunction,
) => {
  logger.info(`GET_USER_TASKS_STATE_CONTROLLER: Retrieving task state for user ${req.user.telegramId}`);
  try {
    const user = req.user;
    const userTasks: UserTasks[] = await UserTasksService.findAllByUserId(user.id);
    const tasksRaw: TasksList[] = await TasksListService.findAll();
    const minUserLevel = Math.min(user.miningLevel, user.secretLevel, user.luckLevel, user.timeLevel);
    const tasks = tasksRaw.map((taskRaw) => {
      const task = {
        id: taskRaw.id,
        task_name: taskRaw.task_name,
        reward: taskRaw.reward * minUserLevel * 3,
        link: taskRaw.link,
        text: taskRaw.text,
        is_claimed: null,
      };
      if (userTasks && userTasks.length > 0) {
        const userTask = userTasks.find(userTask => userTask.tasks_list_id === task.id);
        if (userTask) {
          task.is_claimed = userTask.is_claimed;
        }
      }
      return task;
    });

    logger.info(`GET_USER_TASKS_STATE_CONTROLLER: Task state retrieved for user ${req.user.telegramId}`);
    return res.status(200).json(tasks);
  } catch (e) {
    logger.error(`GET_USER_TASKS_STATE_CONTROLLER: Error retrieving task state for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};
