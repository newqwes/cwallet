import UserService from '../services/userService';
import ApiError from '../exceptions/apiError';
import { isValidReferralCode } from '../utils/referral';
import User from '../database/models/user';
import UserDto from '../dto/userDto';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

const REFERRAL_MIN_LENGTH = 5;

export const updateOwnReferralCode = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }
    const alreadyExistRefCode = await UserService.findOne({ referralCode });

    if (alreadyExistRefCode) {
      return next(ApiError.AlreadyExists('Already exist this referral code!'));
    }

    const user = req.user;
    user.referralCode = referralCode;
    await user.save();

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const updateParentReferralCode = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }

    const parent = await UserService.findOne({ referralCode });

    if (!parent) {
      return next(ApiError.NotFound('This parent with this refCode not found!'));
    }

    const user = req.user;

    user.refParent = parent.telegramId;
    user.refParentChangedTimes += 1;
    await user.save();

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const getReferrals = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
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

    res.status(201).json({ users: usersDto });
  } catch (e) {
    next(e);
  }
};
