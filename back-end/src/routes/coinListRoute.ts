import express from 'express';
import { authMiddleware, userExist } from '../middleware';
import { getActiveCoins, getCoinInfo } from '../controllers/coinListController';

const coinListRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coin List
 *   description: API for work with coin list table.
 */

/**
 * @swagger
 * /api/$coin_id:
 *   get:
 *     summary: Get coin info from coins list
 *     tags: [Coin List]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Referral'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
coinListRoute.get('/', authMiddleware, userExist, getCoinInfo);

/**
 * @swagger
 * /api/get_active_coins:
 *   get:
 *     summary: Get active coin info from coins list
 *     tags: [Coin List]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Referral'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
coinListRoute.get(
  '/get_active_coins',
  authMiddleware,
  userExist,
  getActiveCoins
);

export default coinListRoute;
