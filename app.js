/*
  @@ <STEP 01> .env load
*/
require('dotenv').config();

/*
  @@ <STEP 02> node package import
*/
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200', 'http://127.0.0.1:5500'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleWare = cors(corsOptions);
/*
// Redis 서버가 존재할 경우 이 멀티라인 주석을 해제와 함께 .env에 MAIN_REDIS_PORT, MAIN_REDIS_IP, MAIN_REDIS_PW 값을 기재해주세요.
// @@ define redis config
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const RedisClient = redis.createClient(process.env.MAIN_REDIS_PORT, process.env.MAIN_REDIS_IP);
const redisConnectionResult = RedisClient.auth(process.env.MAIN_REDIS_PW, function(err) {
  if (err) {
    console.log('Redis 에러 발생');
    console.log(err, " 에러 발생했습니다.");
  } else {
    console.log('Redis 연결 성공');
  }
});
*/


/*
  @@ <STEP 03> router import
*/
const indexRouter = require('./src/routes/index/index');
const testRouter = require('./src/routes/test/index');
const authRouter = require('./src/routes/auth/index');
const apiRouter = require('./src/routes/api/index');

/*
  @@ <STEP 04> express app declare
*/
const app = express();

/*
  @@ <STEP 05> custom library import
*/
const setUniqueRequestTail = require('./src/middlewares/setUniqueRequestTail');
const setLogging = require('./src/middlewares/setLogging');
const errorHandler = require('./src/middlewares/errorHandler');

// @@ <STEP 06> view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

/*
  @@ <STEP 07> middleware setting
*/
app.use(setUniqueRequestTail);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.raw());
app.use(express.text());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(session({
  /*
    [ resave 옵션 ]
    모든 request마다 기존에 있던 session에 아무런 변경사항이 없을 시에도
    그 session을 다시 저장하는 옵션입니다.
    (매 request 마다 세션을 계속 다시 저장하는 것)
  */
  resave: false, 
  /*
    [ saveUninitialized 옵션 ]
    request가 들어오면 해당 request에서 새로 생성된 session에 
    아무런 작업이 이루어지지 않아도 해당 session 을 저장하는 옵션입니다.
  */
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false, // https 인 경우 true 로 변경
    maxAge: 60 * 60 * 1000, // 쿠키 지속 시간
    // sameSite: 'strict'
  },
  // redis 서버가 존재할 경우 아래 멀티 라인 주석을 해제해주세요.
  /*
  store: new RedisStore({
    client: RedisClient,
    host: process.env.MAIN_REDIS_IP,
    port: process.env.MAIN_REDIS_PORT,
    pass: process.env.MAIN_REDIS_PW,
    logErrors: true,
  }),
  */
}));
app.use(setLogging);
app.use(corsMiddleWare);

/*
  @@ <STEP 08> static file routing
*/
app.use('/favicon.ico', express.static(path.join(__dirname, 'src', 'public', 'images', 'favicons/') + 'favicon.ico'));
app.use('/public', express.static(path.join(__dirname, 'src', 'public')));

/*
  @@ <STEP 09> router connect
*/
app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

/* 
  @@ <STEP 10> catch 404 and forward to error handler
*/
app.use(function(req, res, next) {
  next(createError(404));
});

/*
  @@ <STEP 11> error handler
*/
app.use(errorHandler);

/* 
  @@ <STEP 12> listening
*/
app.listen(process.env.PORT, function() {
  console.log(`${process.env.PORT}번 포트에서 대기중..`);
});
