import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import userService from '../services/userService';

export const getUserData = async (req, res, next) => {
    try {
        const initData = getInitData(res);
        if (!initData?.user?.id) {
            return next(ApiError.BadRequest('Not valid user data'));
        }

        const { user, created } = await userService.findOrCreateById(initData.user);

        if (!user) {
            return next(ApiError.BadRequest('User not created'));
        }

        return res.status(200).json({ user, created });
    } catch (e) {
        next(e);
    }
};
