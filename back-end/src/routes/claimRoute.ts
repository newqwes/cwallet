import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { claim } from '../controllers/claimController';

const claimRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Claim
 *   description: Main claim button
 */

/**
 * @swagger
 * /api/claim:
 *   post:
 *     summary: User pushed this button for claim coins
 *     tags: [Claim]
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
 *                   description: Next date of update. When user can push the claim button
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
claimRoute.post('/', authMiddleware, claim);

export default claimRoute;
