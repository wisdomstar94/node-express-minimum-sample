const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    result: 'success',
    data: {
      timestamp: new Date().getTime(),
      message: '인증 필요 없는 api 1 의 응답메시지 입니다!',
    },
  });
  return;
});

module.exports = router;
