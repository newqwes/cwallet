import dotenv from 'dotenv';
import { get } from 'lodash';
import { validate, parse } from '@tma.js/init-data-node';
import ApiError from '../exceptions/apiError';
import { TelegramInitDataModel } from '../models';

dotenv.config();

/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
const setInitData = (res: any, initData: any) => {
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
export const getInitData = (res: any): TelegramInitDataModel  => {
  const initData: TelegramInitDataModel = get(res, ['locals', 'initData']);
  if (!initData?.user?.id) {
    throw ApiError.BadRequest('Not valid user data');
  }
  return initData
} ;

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const authMiddleware = (req: any, res: any, next: any) => {
  // We expect passing init data in the Authorization header in the following format:
  // <auth-type> <auth-data>
  // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
  const [authType, authData = ''] = (req.header('authorization') || '').split(' ');
  switch (authType) {
    case 'Bearer':
      try {
        // Validate init data.
        validate(authData, process.env.BOT_TOKEN || '', {
          // We consider init data sign valid for 1 hour from their creation moment.
          // TODO: need to add if necessary
          expiresIn: 0,
        });

        // Parse init data. We will surely need it in the future.
        setInitData(res, parse(authData));
        return next();
      } catch (e: any) {
        return next(ApiError.UnauthorizedError(e.message))
      }
    default:
      return next(ApiError.UnauthorizedError());
  }
};

export default authMiddleware;
