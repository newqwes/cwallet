import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { refresh } from '../controllers/refreshController';

const refreshRoute = express.Router();

refreshRoute.post('/', authMiddleware, refresh);

export default refreshRoute;
