import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { updateOwnReferralCode, getReferrals, updateParentReferralCode } from '../controllers/referralController';

const referralRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Referral
 *   description: Referral system (parent and child)
 */

/**
 * @swagger
 * /api/referral:
 *   post:
 *     summary: Change own referral code
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referralCode:
 *                 type: string
 *                 description: Referral code to change own referral code
 *                 example: REF12345
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
referralRoute.post('/', authMiddleware, updateOwnReferralCode);

/**
 * @swagger
 * /api/referral/parent:
 *   post:
 *     summary: Change referral parent user id
 *     tags: [Referral]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referralCode:
 *                 type: string
 *                 description: Referral code to change the parent user id
 *                 example: REF12345
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
referralRoute.post('/', authMiddleware, updateParentReferralCode);

/**
 * @swagger
 * /api/referral:
 *   get:
 *     summary: Get all your referrals
 *     tags: [Referral]
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
referralRoute.get('/', authMiddleware, getReferrals);

export default referralRoute;
