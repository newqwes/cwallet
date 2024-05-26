import ApiError from '../exceptions/apiError';
import { getInitData } from "../middleware/authMiddleware";

export const refresh = async (req, res, next) => {
  try {
    console.log('refresh: ' + res)
    const initData = getInitData(res);
    if (!initData) {
      return next(ApiError.BadRequest('Cant display init data as long as it was not found'));
    }
    return res.status('200').json(initData);
  } catch (e) {
    console.log('Error 001:', e);
    next(ApiError.BadRequest('Error 001'));
  }
};
