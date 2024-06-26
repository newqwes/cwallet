import express from 'express';
import { authMiddleware, userExist } from '../middleware';
import { setInfo } from '../controllers/tinderGameController';

const tinderRoute = express.Router();
/**
 * @swagger
 * tags:
 *   name: Tinder game
 *   description: Game where users swipe the coins and choose what they want.
 */

/**
 * @swagger
 * /api/tinder_game/set_info:
 *   post:
 *     summary: Set a info about coins swipes
 *     description: Set info about what the user chose.
 *     tags: [Tinder game]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chose_coins:
 *                 type: array
 *                 description: Array of coins which user chose
 *                 example: ["bitcoin", "ethereum"]
 *               reward:
 *                 type: number
 *                 description: Reward for tinder finished
 *                 example: 100
 *     responses:
 *       201:
 *         description: Info successfully saved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, coins doesn't exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tinderRoute.post('/set_info', authMiddleware, userExist, setInfo);

export default tinderRoute;
