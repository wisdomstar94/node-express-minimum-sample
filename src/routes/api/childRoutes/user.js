const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myHash = require('../../../librarys/myHash');
const myGetMakeToken = require('../../../librarys/myGetMakeToken');
require('dotenv').config();

router.get('/', function(req, res, next) {
  const data = [
    { name: '홍길동', age: 32 },
    { name: '신길동', age: 29 },
  ];

  res.status(200).json({
    data: data,
  });
  return;
});

module.exports = router;
