import User from '../database/models/user';
import { Op } from 'sequelize';
import { UserTelegramInitDataModel } from '../models';
import ApiError from '../exceptions/apiError';
import { generateReferralCode } from '../utils/referral';
import { REFERRAL_CODE_LENGTH } from '../constants';

class UserService {
  async findOrCreateById(defaults: UserTelegramInitDataModel): Promise<{ user: User, created: boolean }> {
    try {
      const { id, firstName, lastName, languageCode } = defaults;
      const telegramId = Number(id);

      const [user, created] = await User.findOrCreate({
        where: { telegramId },
        defaults: {
          firstName, lastName, languageCode, referralCode: generateReferralCode(REFERRAL_CODE_LENGTH)
        },
      });
      return { user, created };
    } catch (error) {
      throw new ApiError(404, 'Server Error findOrCreateById', error);
    }
  }

  async findByTelegramUserId(telegramId: number, transaction = null) {
    try {
      return User.findOne({ where: { telegramId }, transaction });
    } catch (error) {
      return null;
    }
  }

  async findOne(arg: any) {
    try {
      return User.findOne({ where: arg });
    } catch (error) {
      return null;
    }
  }

  async findAll(arg?: any) {
    try {
      return User.findAll(arg ? { where: arg } : {});
    } catch (error) {
      return null;
    }
  }

  async findOp(options?: any) {
    try {
      const whereCondition = options ? {
        where: {
          [Op.or]: options.conditions
        },
        group: options.groupBy,
        order: [
          [options.orderBy, 'DESC']
        ]
      } : {};

      return User.findAll(whereCondition as any);
    } catch (error) {
      console.error('Ошибка при поиске пользователей:', error);
      return null;
    }
  }

  async create(user: Partial<User>) {
    try {
      return User.create({
        telegramId: user.telegramId,
        referralCode: generateReferralCode(REFERRAL_CODE_LENGTH),
        refParent: user.refParent,
        firstName: user.firstName,
        lastName: user.lastName,
        refGrandParent: user.refGrandParent,
        languageCode: user.languageCode
      });
    } catch (error) {
      return null;
    }
  }
}

export default new UserService();
