const express = require('express');
const router = express.Router();

const accessTokenCheck = require('../../middlewares/accessTokenCheck');
const accessTokenOriginCheck = require('../../middlewares/accessTokenOriginCheck');

const userRouter = require('./childRoutes/user');
const fileRouter = require('./childRoutes/file');
const loginRouter = require('./childRoutes/login');
const refreshRouter = require('./childRoutes/refresh');

router.use('/user', accessTokenCheck, userRouter);
router.use('/file', fileRouter);
router.use('/login', loginRouter);
router.use('/refresh', accessTokenOriginCheck, refreshRouter);

module.exports = router;
