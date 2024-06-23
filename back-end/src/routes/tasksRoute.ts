import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { setTask, getUserTasksState } from '../controllers/tasksController';

const tasksRoute = express.Router();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tasks for users
 */

/**
 * @swagger
 * /api/tasks/set_task:
 *   post:
 *     summary: Set task fo user
 *     description: Endpoint for set task to user and save tasks states
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 task_name:
 *                   type: string
 *                   description: The name of the task.
 *                   example: "subscribe_to_channel"
 *             example:
 *                 task_name: "subscribe_to_channel"
 *     responses:
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tasksRoute.post('/set_task', authMiddleware, setTask);

/**
 * @swagger
 * /api/tasks/:
 *   get:
 *     summary: Get task info
 *     description: If response task_statuses null - it's and status 200. User dont has states. Use the start state for this user.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tasksRoute.get('/', authMiddleware, getUserTasksState);

export default tasksRoute;
