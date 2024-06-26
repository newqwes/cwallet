import express from 'express';
import claimRoute from './claimRoute';
import userRoute from './userRoute';
import usersRoute from './usersRoute';
import referralRoute from './referralRoute';
import longGameRoute from './longGameRoute';
import shortGameRoute from './shortGameRoute';
import coinListRoute from './coinListRoute';
import tasksRoute from './tasksRoute';
import tinderRoute from './tinderRoute';

const router = express.Router();

router.use('/claim', claimRoute);
router.use('/user', userRoute);
router.use('/users', usersRoute);
router.use('/referral', referralRoute);
router.use('/long_game', longGameRoute);
router.use('/short_game', shortGameRoute);
router.use('/tinder_game', tinderRoute);
router.use('/coin_list', coinListRoute);
router.use('/tasks', tasksRoute);

export default router;
