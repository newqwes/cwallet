import express from 'express';
import { authMiddleware } from '../middleware';
import { getUserData } from '../controllers/userController';

const userRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: User data
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: refParent
 *         schema:
 *           type: string
 *         description: Referral parent identifier
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 created:
 *                   type: boolean
 *                   description: Indicates if the user was created now
 *       400:
 *         description: Bad request
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
 *       405:
 *         description: Method not allowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRoute.get('/', authMiddleware, getUserData);

export default userRoute;
