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

export const getUserData = async (req: any, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const initData = getInitData(res);
    const { user, created }: any = await userService.findOrCreateById(initData.user);

    if (!user) {
      return next(ApiError.BadRequest('User not created'));
    }

    return res.status(created ? 201 : 200).json({ user: new UserDto(user), created });
  } catch (e) {
    next(e);
  }
};

export const upgradeUserLevel = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;
    const level_name = req.body.level_name;
    const levelData = await levelService.findOneByName(level_name);

    if (!levelData) {
      return next(ApiError.BadRequest('This level does not exist'));
    }

    const priceForLevelUp = levelUpPrice({
      price: levelData.price,
      level: 1 + user[level_name],
      multiplier: levelData.multiplier
    });

    if (user.coins < priceForLevelUp) {
      return next(ApiError.BadRequest('Not enough coins'));
    }
    user.coins -= priceForLevelUp;
    user[level_name] += 1;
    await user.save();

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};

export const getUserLevels = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;
    const levels = await levelService.findAll();

    if (!levels) {
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

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
