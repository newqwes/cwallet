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
 *     description: Endpoint for changing own referral code by specifying task_name
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
 *               task_info:
 *                 type: object
 *                 properties:
 *                   task_name:
 *                     type: string
 *                     description: The name of the task.
 *                     example: "subscribe_to_channel"
 *                 required:
 *                   - task_name
 *                   - task_state
 *             example:
 *               task_info:
 *                 task_name: "subscribe_to_channel"
 *                 task_state: 1
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
 *     description: If response return null - it's and status 200. User dont has state. Use the start state for this user.
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
tasksRoute.post('/', authMiddleware, getUserTasksState);

export default tasksRoute;
