import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";
import userService from '../services/userService';

export const getUserData = async (req: any, res: any, next: any) => {
    try {
        const initData = getInitData(res);

        const { user, created }: any = await userService.findOrCreateById(initData.user);

        if (!user) {
            return next(ApiError.BadRequest('User not created'));
        }

        return res.status(200).json({ user, created });
    } catch (e) {
        next(e);
    }
};
