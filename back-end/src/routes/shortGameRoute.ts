import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getDataByShortGame } from '../controllers/shortGameController';

const shortGameRoute = express.Router();

shortGameRoute.get('/', authMiddleware, getDataByShortGame);

export default shortGameRoute;
