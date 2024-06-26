import UserService from '../services/userService';
import ApiError from '../exceptions/apiError';
import { isValidReferralCode } from '../utils/referral';
import User from '../database/models/user';
import UserDto from '../dto/userDto';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';
import { logger } from '../logger';

const REFERRAL_MIN_LENGTH = 5;

export const updateOwnReferralCode = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`UPDATE_OWN_REFERRAL_CODE: User ${req.user.telegramId} is updating referral code`);
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      logger.warn(`UPDATE_OWN_REFERRAL_CODE: Invalid referral code attempted by user ${req.user.telegramId}`);
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }

    const alreadyExistRefCode = await UserService.findOne({ referralCode });
    if (alreadyExistRefCode) {
      logger.warn(`UPDATE_OWN_REFERRAL_CODE: Referral code already exists - attempted by user ${req.user.telegramId}`);
      return next(ApiError.AlreadyExists('Already exist this referral code!'));
    }

    const user = req.user;
    user.referralCode = referralCode;
    await user.save();
    logger.info(`UPDATE_OWN_REFERRAL_CODE: User ${req.user.telegramId} successfully updated their referral code`);

    return res.status(201).json({ user });
  } catch (e) {
    logger.error(`UPDATE_OWN_REFERRAL_CODE: Error updating referral code for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const updateParentReferralCode = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`UPDATE_PARENT_REFERRAL_CODE: User ${req.user.telegramId} is updating parent referral code`);
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      logger.warn(`UPDATE_PARENT_REFERRAL_CODE: Invalid referral code attempted by user ${req.user.telegramId}`);
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }

    const parent = await UserService.findOne({ referralCode });
    if (!parent) {
      logger.warn(`UPDATE_PARENT_REFERRAL_CODE: No parent found with referral code by user ${req.user.telegramId}`);
      return next(ApiError.NotFound('This parent with this refCode not found!'));
    }

    const user = req.user;
    user.refParent = parent.telegramId;
    user.refParentChangedTimes += 1;
    await user.save();
    logger.info(`UPDATE_PARENT_REFERRAL_CODE: User ${req.user.telegramId} successfully updated parent referral code`);

    return res.status(201).json({ user });
  } catch (e) {
    logger.error(`UPDATE_PARENT_REFERRAL_CODE: Error updating parent referral code for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};

export const getReferrals = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  logger.info(`GET_REFERRALS: User ${req.user.telegramId} is retrieving their referrals`);
  try {
    const telegramId = req.user.telegramId;

    const conditions = [
      { refParent: telegramId },
      { refGrandParent: telegramId }
    ];

    const referralsAndGrandchildren = await UserService.findOp({
      conditions: conditions,
      orderBy: 'secretLevel'
    });

    const mapToDto = (user: User) => new UserDto(user);
    const usersDto = referralsAndGrandchildren?.map(mapToDto) || [];
    logger.info(`GET_REFERRALS: Retrieved referrals for user ${req.user.telegramId}`);

    res.status(201).json({ users: usersDto });
  } catch (e) {
    logger.error(`GET_REFERRALS: Error retrieving referrals for user ${req.user.telegramId} - ${e}`);
    next(e);
  }
};
