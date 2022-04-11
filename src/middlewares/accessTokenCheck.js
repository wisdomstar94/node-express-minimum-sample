const myLogger = require('../librarys/myLogger');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenCheck = function(req, res, next) {
  myLogger.info(req.logHeadTail + 'accessTokenCheck 진입');

  const getAccessToken = function() {
    const Authorization = req.headers['Authorization'];
    const authorization = req.headers['authorization'];

    if (typeof Authorization !== 'string') {
      return authorization;
    }

    return Authorization;
  };

  let accessToken = getAccessToken();

  myLogger.info(req.logHeadTail + 'accessToken = ' + accessToken);

  if (typeof accessToken !== 'string') {
    res.status(403).json({
      code: 1,
      msg: '토큰이 없음',
    });
    return;
  }
  accessToken = accessToken.replace('bearer ', '').replace('Bearer ', '');

  try {
    req.accessTokenDecoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (e) {
    const name = e.name;
    myLogger.error(req.logHeadTail + e.stack);
    myLogger.error(req.logHeadTail + JSON.stringify(e));

    if (name === 'TokenExpiredError') {
      res.status(403).json({
        code: 33,
        msg: '만료된 토큰',
      });
      return;
    }

    res.status(403).json({
      code: 2,
      msg: '유효한 토큰 아님',
    });
    return;
  }

  next();
};

module.exports = accessTokenCheck;
