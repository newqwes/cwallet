import { pick } from 'lodash/fp';
import ApiError from '../exceptions/apiError';

const checkLastRefreshDate = (req: any, res: any, next: any) => {
  try {
    const { nextDateUpdate } = pick(
      ['nextDateUpdate'],
      req.user,
    );

    // const timeLimitOver = isTimeLimitOver(nextDateUpdate);

    // if (!timeLimitOver) {
    //   return res.status(405).json({ message: 'Еще время не настало!' });
    // }

    next();
  } catch (e) {
    return next(ApiError.BadRequest('Ошибка при валидации'));
  }
};

export default checkLastRefreshDate;
