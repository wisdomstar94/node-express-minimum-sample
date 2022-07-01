const express = require('express');
const router = express.Router();
const myMysql = require('../../../librarys/myMysql');

router.get('/', function(req, res, next) {
  res.json({
    result: 'success',
    data: {
      timestamp: new Date().getTime(),
      message: '인증이 필요한 api 3 의 응답메시지 입니다!',
    },
  });
  return;
});

module.exports = router;
