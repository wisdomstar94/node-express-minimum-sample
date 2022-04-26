const express = require('express');
const router = express.Router();
const myMysql = require('../../../librarys/myMysql');

router.post('/', async(req, res, next) => {
  const data = {
    result: 'failure',
    code: 241110,
    timestamp: (new Date()).getTime(),
  };
  res.status(403).json(data);
  return;
});

module.exports = router;
