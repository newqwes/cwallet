import ApiError from '../exceptions/apiError';
import { getInitData } from '../middleware';
import userService from '../services/userService';
import levelService from '../services/levelService';
import UserDto from '../dto/userDto';
import {
  getReadableName,
  getUpgradeFromToData,
  levelUpPrice
} from '../utils/claimCoins';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

export const getUserData = async (req: any, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`GET_USER_DATA: Retrieving or creating user data`);
  try {
    const initData = getInitData(res);
    const { user, created }: any = await userService.findOrCreateById(initData.user);

    if (!user) {
      logger.error(`GET_USER_DATA: Failed to create user with initData ${initData.user}`);
      return next(ApiError.BadRequest('User not created'));
    }

    logger.debug(`GET_USER_DATA: User data retrieved or created for user ${user.telegramId}, created: ${created}`);
    return res.status(created ? 201 : 200).json({ user: new UserDto(user), created });
  } catch (e) {
    logger.error(`GET_USER_DATA: Error retrieving or creating user - ${e}`);
    next(e);
  }
};

export const upgradeUserLevel = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`UPGRADE_USER_LEVEL: Attempting to upgrade level for user ${req.user.telegramId}`);
  try {
    const user = req.user;
    const level_name = req.body.level_name;
    const levelData = await levelService.findOneByName(level_name);

    if (!levelData) {
      logger.warn(`UPGRADE_USER_LEVEL: Level ${level_name} does not exist`);
      return next(ApiError.BadRequest('This level does not exist'));
    }

    const priceForLevelUp = levelUpPrice({
      price: levelData.price,
      level: 1 + user[level_name],
      multiplier: levelData.multiplier
    });

    if (user.coins < priceForLevelUp) {
      logger.warn(`UPGRADE_USER_LEVEL: Not enough coins for level up for user ${req.user.telegramId}`);
      return next(ApiError.BadRequest('Not enough coins'));
    }
    user.coins -= priceForLevelUp;
    user[level_name] += 1;
    await user.save();

    logger.info(`UPGRADE_USER_LEVEL: Level upgraded for user ${req.user.telegramId}, new level ${user[level_name]}`);
    return res.status(201).json({ success: true });
  } catch (e) {
    logger.error(`UPGRADE_USER_LEVEL: Error upgrading level for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const getUserLevels = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`GET_USER_LEVELS: Retrieving levels for user ${req.user.telegramId}`);
  try {
    const user = req.user;
    const levels = await levelService.findAll();

    if (!levels) {
      logger.warn(`GET_USER_LEVELS: No levels found in the system`);
      return next(ApiError.BadRequest('Levels does not exist'));
    }

    const result = levels.reduce((acc, levelData) => {
      const level = user[levelData.name];
      const priceForLevelUp = levelUpPrice({
        price: levelData.price,
        level: level + 1,
        multiplier: levelData.multiplier
      });

      const upgrade = getUpgradeFromToData({
        name: levelData.name,
        luckLevel: user.luckLevel,
        miningLevel: user.miningLevel,
        secretLevel: user.secretLevel,
        timeLevel: user.timeLevel,
        claimBias: user.claimBias,
        claimInfluence: user.claimInfluence,
        timeBias: user.timeBias,
        timeInfluence: user.timeInfluence
      });

      acc.push({
        id: levelData.name,
        level,
        price: priceForLevelUp,
        upgrade,
        name: getReadableName(levelData.name)
      });

      return acc;
    }, []);

    logger.info(`GET_USER_LEVELS: Levels data prepared for user ${req.user.telegramId}`);
    return res.status(200).json(result);
  } catch (e) {
    logger.error(`GET_USER_LEVELS: Error retrieving levels for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};
