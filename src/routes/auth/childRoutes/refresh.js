const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myLogger = require('../../../librarys/myLogger');
require('dotenv').config();

router.post('/', function(req, res, next) {
  let accessToken = req.headers['authorization'];
  if (typeof accessToken !== 'string') {
    res.status(403).json({
      code: 1,
      msg: '권한이 없습니다.',
    });
    return;
  }
  accessToken = accessToken.replace('bearer ', '').replace('Bearer ', '');

  try {
    req.accessTokenDecoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (e) {
    if (e.name !== 'TokenExpiredError') {
      myLogger.error(req.logHeadTail + e.stack);
      myLogger.error(req.logHeadTail + JSON.stringify(e));

      res.status(403).json({
        code: 2,
        msg: '권한이 없습니다.',
      });
      return;
    }
  }

  const {
    refresh_token,
  } = req.body;

  if (typeof refresh_token !== 'string') {
    res.status(403).json({
      code: 3,
      msg: '권한이 없습니다.',
    });
    return;
  }

  try {
    req.refreshTokenDecoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
  } catch (e) {
    myLogger.info(req.logHeadTail + e.stack);
    myLogger.info(req.logHeadTail + JSON.stringify(e));

    res.status(403).json({
      code: 4,
      msg: '권한이 없습니다.',
    });
    return;
  }

  // accessToken 재발급
  const newAccessToken = jwt.sign({
    // a: myCrypto.encrypt({ originalValue: findedUserInfo.userKey }), // 회원키
    // b: myCrypto.encrypt({ originalValue: findedUserInfo.userId }), // 회원 아이디
    // c: myCrypto.encrypt({ originalValue: findedUserInfo.userName }),  // 회원명
    // d: myCrypto.encrypt({ originalValue: req.real_ip }) // 로그인 할때의 IP
    key1: 'test1',
    key2: 'test2',
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTE, 
    issuer: process.env.PROJECT_NAME,
  });

  res.status(200).json({
    code: 0,
    data: {
      accessToken: newAccessToken,
    },
  });
  return;
});

module.exports = router;
