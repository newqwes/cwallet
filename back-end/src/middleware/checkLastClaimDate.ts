import { pick } from 'lodash/fp';
import ApiError from '../exceptions/apiError';

const checkLastClaimDate = (req: any, res: any, next: any) => {
  try {
    const { nextClaimDate } = pick(
      ['nextClaimDate'],
      req.user,
    );

    // const timeLimitOver = isTimeLimitOver(nextClaimDate);

    // if (!timeLimitOver) {
    //   return res.status(405).json({ message: 'Еще время не настало!' });
    // }

    next();
  } catch (e) {
    return next(ApiError.BadRequest('Ошибка при валидации'));
  }
};

export default checkLastClaimDate;
