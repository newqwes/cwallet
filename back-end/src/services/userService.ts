import User from '../database/models/user';
import createResponse from '../utils/createResponse';
import { UserTelegramInitDataModel } from '../models';

class UserService {
    async findOrCreateById(defaults: UserTelegramInitDataModel) {
        try {
            const { id, firstName, lastName, languageCode } = defaults;
            const telegramId = Number(id);

            const [user, created] = await User.findOrCreate({
                where: { telegramId },
                defaults: {
                    telegramId, firstName, lastName, languageCode
                },
            });
            return { user, created };
        } catch (error) {
            createResponse(404, 'Server Error findOrCreateById', error);
        }
    }

    async findByTelegramUserId(telegramId: number) {
        try {
            return User.findOne({ where: { telegramId } });
        } catch (error) {
            return null;
        }
    }
}

export default new UserService();
