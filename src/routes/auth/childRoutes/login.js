const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myHash = require('../../../librarys/myHash');
const myGetMakeToken = require('../../../librarys/myGetMakeToken');
require('dotenv').config();

router.post('/', function(req, res, next) {
  // create access token
  const newAccessToken = jwt.sign({
    // a: myHash.encrypt({ originalValue: userInfo.userKey }), // 회원키
    // b: myHash.encrypt({ originalValue: userInfo.userId }), // 회원 아이디
    // c: myHash.encrypt({ originalValue: userInfo.userName }),  // 회원명
    // d: myHash.encrypt({ originalValue: req.real_ip }) // 로그인 할때의 IP
    key1: 'test1',
    key2: 'test2',
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTE, 
    issuer: process.env.PROJECT_NAME,
  });

  // create refresh token
  const newJwtRefreshTokenKey = myGetMakeToken({ strlength: 20 });
  const newRefreshToken = jwt.sign({
    a: myHash.encrypt({ originalValue: newJwtRefreshTokenKey }), // jwt refresh token key
    b: (new Date()).getTime(),
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_MINUTE, 
    issuer: process.env.PROJECT_NAME,
  });

  res.status(200).json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
  });
  return;
});

module.exports = router;
