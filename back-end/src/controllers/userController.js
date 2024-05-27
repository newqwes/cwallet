import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";

export const getUserData = async (req, res, next) => {
    try {
        const initData = getInitData(res);
        if (!initData) {
            return next(ApiError.BadRequest('User was not found'));
        }
        return res.status('200').json(initData);
    } catch (e) {
        console.log('Error getUserData:', e);
        next(ApiError.BadRequest('Error getUserData'));
    }
};
