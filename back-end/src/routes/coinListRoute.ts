import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getCoinInfo } from '../controllers/coinListController';

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
coinListRoute.get('/', authMiddleware, getCoinInfo);

export default coinListRoute;
