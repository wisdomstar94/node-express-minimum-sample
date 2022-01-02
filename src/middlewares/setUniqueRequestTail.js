const myGetMakeToken = require('../librarys/myGetMakeToken');

const setUniqueRequestTail = function(req, res, next) {
  req.access_unique_key = myGetMakeToken({ strlength: 20 });
  req.logHeadTail = req.access_unique_key + ' - ';
  next();
};

module.exports = setUniqueRequestTail;