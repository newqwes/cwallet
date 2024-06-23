import express from 'express';
import { authMiddleware, userExist } from '../middleware';
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
 *     summary: Set a task for a user
 *     description: Assigns a specific task to a user and saves the task state.
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
 *               task_name:
 *                 type: string
 *                 description: The name of the task to be assigned.
 *                 example: "subscribe_to_channel"
 *     responses:
 *       201:
 *         description: Task successfully assigned and state saved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, task doesn't exist or reward already claimed.
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
tasksRoute.post('/set_task', authMiddleware, userExist, setTask);

/**
 * @swagger
 * /api/tasks/:
 *   get:
 *     summary: Get user's task information
 *     description: Retrieves the tasks and their statuses for the logged-in user. If the `task_statuses` array is null, it indicates the user has no tasks states set; a default start state should be used for this user.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved task information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     tasks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Task'
 *                     task_statuses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/TaskStatus'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tasksRoute.get('/', authMiddleware, userExist, getUserTasksState);

export default tasksRoute;
