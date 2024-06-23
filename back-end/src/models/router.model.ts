import { Request, Response, NextFunction } from 'express';
import User from "../database/models/user";

export interface CustomRequest extends Request {
  user?: User;
}

export interface CustomResponse extends Response {
}

export interface CustomNextFunction extends NextFunction {
}
