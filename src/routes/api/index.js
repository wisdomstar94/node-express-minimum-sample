const express = require('express');
const router = express.Router();

const accessTokenCheck = require('../../middlewares/accessTokenCheck');

const userRouter = require('./childRoutes/user');

router.use('/user', accessTokenCheck, userRouter);

module.exports = router;
