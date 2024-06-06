import { getInitData } from '../middleware/authMiddleware';
import UserService from '../services/userService';
import ApiError from '../exceptions/apiError';
import { isValidReferralCode } from '../utils/referral';
import User from '../database/models/user';
import UserDto from '../dto/userDto';

const REFERRAL_MIN_LENGTH = 5;

export const updateOwnReferralCode = async (req: any, res: any, next: any) => {
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }
    const alreadyExistRefCode = await UserService.findOne({ referralCode });

    if (alreadyExistRefCode) {
      return next(ApiError.AlreadyExists('Already exist this referral code!'));
    }

    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    user.referralCode = referralCode;
    await user.save();

    return res.status('201').json({ user });
  } catch (e) {
    next(e);
  }
};

export const updateParentReferralCode = async (req: any, res: any, next: any) => {
  try {
    const referralCode = req.body?.referralCode;

    if (!isValidReferralCode(referralCode) && referralCode.length < REFERRAL_MIN_LENGTH) {
      return next(ApiError.BadRequest('Referral code is not valid!'));
    }

    const parent = await UserService.findOne({ referralCode });

    if (!parent) {
      return next(ApiError.NotFound('This parent with this refCode not found!'));
    }

    const initData = getInitData(res);
    const user = await UserService.findByTelegramUserId(initData.user.id);

    if (!user) {
      return next(ApiError.NotFound('User not found by telegramId'));
    }

    user.refParent = parent.telegramId;
    user.refParentChangedTimes += 1;
    await user.save();

    return res.status('201').json({ user });
  } catch (e) {
    next(e);
  }
};

export const getReferrals = async (req: any, res: any, next: any) => {
  try {
    const initData = getInitData(res);
    const referrals = await UserService.findAll({ refParent: initData.user.id });

    return res.status('201').json({ referrals: referrals.map((referral: User) => new UserDto(referral)) });
  } catch (e) {
    next(e);
  }
};
