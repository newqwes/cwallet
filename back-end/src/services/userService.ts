import User from '../database/models/user';
import { UserTelegramInitDataModel } from '../models';
import ApiError from '../exceptions/apiError';
import { generateReferralCode, isValidReferralCode } from '../utils/referral';
import { REFERRAL_CODE_LENGTH } from '../constants';

class UserService {
    async findOrCreateById(defaults: UserTelegramInitDataModel, refParentCode: string = null): Promise<{ user: User, created: boolean }> {
        try {
            const { id, firstName, lastName, languageCode } = defaults;
            const telegramId = Number(id);
            let refParentTelegramId = null;
            if (refParentCode && isValidReferralCode(refParentCode)) {
                refParentTelegramId = refParentCode;
            }

            const [user, created] = await User.findOrCreate({
                where: { telegramId },
                defaults: {
                    firstName, lastName, languageCode, referralCode: generateReferralCode(REFERRAL_CODE_LENGTH), refParent: refParentTelegramId
                },
            });
            return { user, created };
        } catch (error) {
            throw new ApiError(404, 'Server Error findOrCreateById', error);
        }
    }

    async findByTelegramUserId(telegramId: number) {
        try {
            return User.findOne({ where: { telegramId } });
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

    async findAll(arg: any) {
        try {
            return User.findAll({ where: arg });
        } catch (error) {
            return null;
        }
    }
}

export default new UserService();
