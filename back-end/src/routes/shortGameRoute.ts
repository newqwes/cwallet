import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  getSortedDataByShortGame,
  setShortGameData,
  getShortGameResultData,
} from '../controllers/shortGameController';

const shortGameRoute = express.Router();

shortGameRoute.get('/', authMiddleware, getSortedDataByShortGame);

shortGameRoute.post('/create_data', authMiddleware, setShortGameData);
shortGameRoute.get('/game_result', authMiddleware, getShortGameResultData);

export default shortGameRoute;
