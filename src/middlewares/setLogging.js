const geoip = require('geoip-lite');
const requestIP = require('request-ip');
const path = require('path');
const myGetFileNameAndType = require('../librarys/myGetFileNameAndType');
const myLogger = require('../librarys/myLogger');

const setLogging = function(req, res, next) {
  const clientIP = requestIP.getClientIp(req);

  const block_ips = [
    '::ffff:172.17.0.1', '172.17.0.1'
  ];

  if (block_ips.includes(clientIP)) {
    myLogger.info(req.logHeadTail + 'request ip address : ' + clientIP + ' 차단...');
    res.status(403).end();
    return;
  }

  // const allow_ips = ['::1'];
  // if (!myIPChecker.ipCheck(allow_ips, clientIP)) {
  //   res.status(403).send('허용되지 않은 접근입니다.');
  //   return;
  // }

  // 아래 확장자들에 대해서는 header나 body값 등에 대한 로그 출력하지 않음.
  const notLoggingFileType = [
    'jpg', 'jpeg', 'png', 'gif', 'ico', // 이미지 파일

    'txt', // 텍스트 파일

    'js', 'css', // js 및 css 파일

    'map', // map 파일

    'ogg', 'mp3', 'wav', // 음악 파일
  ];

  const request_url_file_basename = path.basename(req.url); // ex) /public/images/favicons/favicon.png 일 경우 favicon.png
  const request_url_file_basename_info = myGetFileNameAndType({ full_file_name: request_url_file_basename }); // ex) { file_only_name: 'favicon', file_only_type: 'png' }
  const request_url_file_basename_file_name = request_url_file_basename_info.file_only_name; // ex) favicon
  const request_url_file_basename_file_type = request_url_file_basename_info.file_only_type; // ex) png

  req.real_ip = clientIP;
  req.full_path = req.path; // ex) /api/user/list

  if (!notLoggingFileType.includes(request_url_file_basename_file_type)) {
    myLogger.info(req.logHeadTail + '');
    myLogger.info(req.logHeadTail + '==================================================================');
    myLogger.info(req.logHeadTail + '▦▦▦▦▦▦▦  ' + req.method + ' ' + req.url + '  ▦▦▦▦▦▦▦');
    myLogger.info(req.logHeadTail + 'request ip address : ' + clientIP);
    myLogger.info(req.logHeadTail + 'request ip info : ' + JSON.stringify(geoip.lookup(clientIP)));
    myLogger.info(req.logHeadTail + 'request header : ' + JSON.stringify(req.headers));
    myLogger.info(req.logHeadTail + 'request body : ' + JSON.stringify(req.body));
    myLogger.info(req.logHeadTail + 'request query : ' + JSON.stringify(req.query));
    // myLogger.info('request subdomains : ' + req.subdomains);
    // myLogger.info('request hostname : ' + req.hostname);
  }

  req.is_test_server = false;
  if (req.hostname === 'localhost') {
    req.is_test_server = true;
  }

  next();
};

module.exports = setLogging;