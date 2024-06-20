import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  getDataByShortGame,
  setShortGameData,
  getRewardsByShortGame,
} from '../controllers/shortGameController';

const shortGameRoute = express.Router();

shortGameRoute.get('/', authMiddleware, getDataByShortGame);
shortGameRoute.post('/rewards', authMiddleware, getRewardsByShortGame);
shortGameRoute.post('/', authMiddleware, setShortGameData);

export default shortGameRoute;
