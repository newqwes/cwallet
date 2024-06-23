import express from 'express';
import { authMiddleware, userExist } from '../middleware';
import { sendUserCryptoBag } from '../controllers/longGameController';

const longGameRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Long Game
 *   description: Long Game it's game for users. Users collect coins into bag, and wait 3 days.
 */

/**
 * @swagger
 * /api/long_game:
 *   post:
 *     summary: Save user crypto_bag for Long Game
 *     tags: [Long Game]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crypto_bag:
 *                 type: object
 *                 description: User crypto bag where key is coin id and value is coin count
 *                 example: {bitcoin: 20, solana: 50}
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Already exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
longGameRoute.post('/', authMiddleware, userExist, sendUserCryptoBag);

export default longGameRoute;
