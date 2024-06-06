import ApiError from '../exceptions/apiError';
import userService from '../services/userService';
import UserDto from '../dto/userDto';

export const getUsersData = async (req: any, res: any, next: any) => {
    try {
        const users = await userService.findAll();

        if (!users) {
            return next(ApiError.BadRequest('User not created'));
        }

        return res.status(200).json(users.map((user) => new UserDto(user)));
    } catch (e) {
        next(e);
    }
};
