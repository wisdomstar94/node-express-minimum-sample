const myLogger = require('../librarys/myLogger');

const errorHandler = function(err, req, res, next) {
  console.log('errorHandler 진입');
  const err_status = err.status || 500;

  if (err_status !== 404) {
    myLogger.error(req.logHeadTail + err.stack);
    myLogger.error(req.logHeadTail + JSON.stringify(err));
  }

  if (err_status === 404) {
    res.status(404).end();
    return;
  }

  myLogger.error(req.logHeadTail + 'message : ' + err.message);
  myLogger.error(req.logHeadTail + 'status : ' + err_status);

  res.status(err_status);
  try {
    if (typeof err.message === 'string') {
      res.status(err_status).send(err.message);
      return;  
    }

    const json_object = JSON.parse(err.message);
    res.status(err_status).json(json_object);
    return;
  } catch (e) {
    res.send('에러가 발생하였습니다. 접근코드 : ' + req.access_unique_key);
    return;
  }
};

module.exports = errorHandler;
