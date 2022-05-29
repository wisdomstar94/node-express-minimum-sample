const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myHash = require('../../../librarys/myHash');
const myGetMakeToken = require('../../../librarys/myGetMakeToken');
require('dotenv').config();

router.post('/', function(req, res, next) {
  const newAccessToken = jwt.sign({
    username: 'test', // 회원키
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTE, 
    issuer: process.env.PROJECT_NAME,
  });

  const data = {
    result: 'success',
    code: 100100,
    data: {
      access_token: newAccessToken,
    },
  };

  res.status(200).json({
    data: data,
  });
  return;
});

module.exports = router;
