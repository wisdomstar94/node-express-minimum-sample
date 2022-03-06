const express = require('express');
const router = express.Router();

const accessTokenCheck = require('../../middlewares/accessTokenCheck');

const loginRouter = require('./childRoutes/login');
const refreshRouter = require('./childRoutes/refresh');

router.use('/login', loginRouter);
router.use('/refresh', refreshRouter);

module.exports = router;
