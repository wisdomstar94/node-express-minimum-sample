const express = require('express');
const router = express.Router();

const accessTokenCheck = require('../../middlewares/accessTokenCheck');

const api1Router = require('./childRoutes/api1');
const api2Router = require('./childRoutes/api2');
const api3Router = require('./childRoutes/api3');
const errorRouter = require('./childRoutes/error');

const loginRouter = require('./childRoutes/login');
const refreshAccessTokenRouter = require('./childRoutes/refreshAccessToken');

router.use('/api1', api1Router);
router.use('/api2', api2Router);
router.use('/api3', accessTokenCheck, api3Router);
router.use('/api4', errorRouter);

router.use('/login', loginRouter);
router.use('/refreshAccessToken', refreshAccessTokenRouter);

module.exports = router;
