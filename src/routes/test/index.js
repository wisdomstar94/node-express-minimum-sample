const express = require('express');
const router = express.Router();

const test1Router = require('./childRoutes/test1');
const test2Router = require('./childRoutes/test2');
const test3Router = require('./childRoutes/test3');

router.use('/test1', test1Router);
router.use('/test2', test2Router);
router.use('/test3', test3Router);

module.exports = router;
