import User from '../database/models/user';
import createResponse from '../utils/createResponse';

class UserService {
    async findOrCreateById(defaults: any) {
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
            createResponse(500, 'Server Error findOrCreateById', error);
        }
    }

    async findByTelegramUserId(telegramId: any) {
        try {
            return User.findOne({ where: { telegramId } });
        } catch (error) {
            return false;
        }
    }
}

export default new UserService();
