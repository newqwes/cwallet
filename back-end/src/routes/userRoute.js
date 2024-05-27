import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getUserData } from '../controllers/userController';

const userRoute = express.Router();

userRoute.get('/', authMiddleware, getUserData);

export default userRoute;
