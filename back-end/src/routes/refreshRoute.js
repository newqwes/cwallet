import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { refresh } from '../controllers/refreshController';

const refreshRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Refresh
 *   description: Main refresh button
 */

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: User pushed this button for claim coins
 *     tags: [Refresh]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 claimedCoins:
 *                   type: number
 *                 nextDate:
 *                   type: string
 *                   format: date-time
 *                   description: Next date of update. When user can push the refresh button
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: It's not time yet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
refreshRoute.post('/', authMiddleware, refresh);

export default refreshRoute;
