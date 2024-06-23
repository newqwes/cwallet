import ApiError from '../exceptions/apiError';
import { NextFunction } from "express";
import { getInitData } from "./authMiddleware";
import UserService from "../services/userService";

/**
 * Middleware function to check if a user exists by Telegram user ID.
 * If the user does not exist, it returns a 404 Not Found error.
 *
 * @param {any} req - The request object.
 * @param {any} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the middleware function completes.
 * @throws {ApiError} - Throws a 404 Not Found error if the user is not found.
 */
export const userExist = async (req: any, res: any, next: NextFunction): Promise<void> => {
  const initData = getInitData(res);
  const user = await UserService.findByTelegramUserId(initData.user.id);
  if (!user) {
    return next(ApiError.NotFound('User not found by telegramId'));
  }
  req.user = user;
  return next();
};
