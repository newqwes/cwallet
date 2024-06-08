import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getUsersData } from '../controllers/usersController';

const usersRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Users data
 *     tags: [Users]
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
 *                 $ref: '#/components/schemas/User'
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
usersRoute.get('/', authMiddleware, getUsersData);

export default usersRoute;
