import express from 'express';
import { authMiddleware, userExist } from '../middleware';
import {
  getDataByShortGame,
  setShortGameData,
  getRewardsByShortGame
} from '../controllers/shortGameController';

const shortGameRoute = express.Router();

shortGameRoute.get('/', authMiddleware, userExist, getDataByShortGame);
shortGameRoute.post('/rewards', authMiddleware, userExist, getRewardsByShortGame);
shortGameRoute.post('/', authMiddleware, userExist, setShortGameData);

export default shortGameRoute;
