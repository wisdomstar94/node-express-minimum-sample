const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myGetMakeToken = require('../../../librarys/myGetMakeToken');
const myHash = require('../../../librarys/myHash');
require('dotenv').config();

router.post('/', function(req, res, next) {
  // create access token
  const newAccessToken = jwt.sign({
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
    b: new Date().getTime(),
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_MINUTE, 
    issuer: process.env.PROJECT_NAME,
  });

  res.json({
    result: 'success',
    data: {
      timestamp: new Date().getTime(),
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
  return;
});

module.exports = router;
