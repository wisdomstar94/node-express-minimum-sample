const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(401).json({
    result: 'fail',
    data: {
      timestamp: new Date().getTime(),
      message: '에러 샘플 응답입니다.',
    },
  });
  return;
});

module.exports = router;
