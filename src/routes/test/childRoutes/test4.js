const express = require('express');
const router = express.Router();
const myMysql = require('../../../librarys/myMysql');

router.post('/', async(req, res, next) => {
  const data = {
    result: 'success',
    code: 100100,
    timestamp: (new Date()).getTime(),
  };
  res.json(data);
  return;
});

module.exports = router;
