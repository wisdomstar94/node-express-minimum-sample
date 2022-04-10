const express = require('express');
const router = express.Router();

const accessTokenCheck = require('../../middlewares/accessTokenCheck');

const userRouter = require('./childRoutes/user');
const fileRouter = require('./childRoutes/file');

router.use('/user', accessTokenCheck, userRouter);
router.use('/file', fileRouter);

module.exports = router;
