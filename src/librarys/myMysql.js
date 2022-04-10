const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const myIsNumber = require('../librarys/myIsNumber');
const myDate = require('../librarys/myDate');
require('dotenv').config();




/*
  pools
*/
const main_db_connect_info = {
  host: process.env.MAIN_DB_IP,
  port: Number(process.env.MAIN_DB_PORT),
  user: process.env.MAIN_DB_USER,
  password: process.env.MAIN_DB_PASSWORD,
  database: process.env.MAIN_DB_DEFAULT_DB,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 4,
  // acquireTimeout: 2000, // not supported... :(
};
const main_db_pool = mysql.createPool(main_db_connect_info);

const other_db_connect_info = {
  // ...
};
const other_db_pool = {}; 




// function define.
/**
 * @typedef {'main'|'sub'} DBTYPE
 */

/**
 * @typedef DBINFO
 * @property {any} pool
 * @property {any} conn
 */

/**
 * @function getPoolConnection
 * @param {object} params 
 * @param {DBTYPE=} params.db_type db 종류
 * @returns {DBINFO}
 */
const getPoolConnection = async(params) => {
  console.log('getPoolConnection 실행');

  if (typeof params !== 'object') {
    throw new Error(`getPoolConnection 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  // if (typeof params.db_type !== 'string') {
  //   throw new Error(`getPoolConnection 함수는 params.db_type 문자열 인자가 필요합니다.`);
  // }
  // const mysql_connect_info = {
  //   host: typeof params.host === 'string' ? params.host : process.env.MAIN_DB_IP,
  //   port: myIsNumber({ value: params.port }) ? Number(params.port) : Number(process.env.MAIN_DB_PORT),
  //   user: typeof params.user === 'string' ? params.user : process.env.MAIN_DB_USER,
  //   password: typeof params.password === 'string' ? params.password : process.env.MAIN_DB_PASSWORD,
  //   database: typeof params.database === 'string' ? params.database : process.env.MAIN_DB_DEFAULT_DB,
  //   waitForConnections: true,
  //   connectionLimit: 15,
  // };
  // const pool = mysql.createPool(mysql_connect_info);

  let pool = main_db_pool;
  if (params.db_type === 'other...') {
    pool = other_db_pool; // ...
  }

  let pool_connection = null;
  try {
    pool_connection = await pool.getConnection();
  } catch (e) {
    await this.releaseConnection({ conn: pool_connection });
    throw new Error(e);
  }
    
  console.log('getPoolConnection 종료');
  return {
    pool: pool,
    conn: pool_connection,
  };
};

/**
 * @function releaseConnection
 * @param {object} params 
 * @param {any} params.conn release 할 connection 객체
 * @returns {boolean}
 */
const releaseConnection = async(params) => {
  if (typeof params !== 'object') {
    throw new Error(`releaseConnection 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  if (params.conn === undefined || params.conn === null) {
    // throw new Error(`releaseConnection 함수는 params.conn 인자가 필요합니다.`);
    return true;
  }
  const conn = params.conn;

  console.log('typeof conn.release', typeof conn.release);
  if (typeof conn.release !== 'function') {
    return true;
  }

  // pool.releaseConnection(params.conn); // 무한루프
  await conn.release();
  return true;
};

/**
 * @function query
 * @param {object} params 
 * @param {any} params.conn conn
 * @param {string} params.query 쿼리문
 * @param {any} params.values 쿼리 바인딩 값
 */
const query = async(params) => {
  if (typeof params !== 'object') {
    throw new Error(`query 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  // if (params.pool === undefined) {
  //   throw new Error(`query 함수는 params.pool 인자가 필요합니다.`);
  // }
  // const pool = params.pool;

  if (params.conn === undefined) {
    throw new Error(`query 함수는 params.conn 인자가 필요합니다.`);
  }
  const conn = params.conn;

  if (typeof params.query !== 'string') {
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    throw new Error(`query 함수는 params.query 문자열 인자가 필요합니다.`);
  }
  const querys = params.query;

  if (params.values === undefined) {
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    throw new Error(`query 함수는 params.values 인자가 필요합니다.`);
  }
  const values = params.values;

  try {
    const [rows, fields] = await conn.query(querys, values);
    return rows;
  } catch (e) {
    // pool.releaseConnection(conn);
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    console.error(myDate().format('YYYY-MM-DD HH:mm:ss') + ' error => ', e);
    throw new Error(`query 에러가 발생하였습니다.`);
  }
};

/**
 * @function startTransaction
 * @param {object} params 
 * @param {any} params.conn
 */
const startTransaction = async(params) => {
  if (params === undefined) {
    throw new Error(`startTransaction 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  if (params.conn === undefined) {
    throw new Error(`startTransaction 함수는 params.conn 인자가 필요합니다.`);
  }
  const conn = params.conn;

  try {
    await conn.beginTransaction();
  } catch (e) {
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    console.error(myDate().format('YYYY-MM-DD HH:mm:ss') + ' error => ', e);
    throw new Error(`startTransaction 에러가 발생하였습니다.`);
  }
};

/**
 * @function rollback
 * @param {object} params 
 * @param {any} params.conn
 */
const rollback = async(params) => {
  if (params === undefined) {
    throw new Error(`rollback 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  if (params.conn === undefined) {
    throw new Error(`rollback 함수는 params.conn 인자가 필요합니다.`);
  }
  const conn = params.conn;

  try {
    await conn.rollback();
  } catch (e) {
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    console.error(myDate().format('YYYY-MM-DD HH:mm:ss') + ' error => ', e);
    throw new Error(`rollback 에러가 발생하였습니다.`);
  }
};

/**
 * @function commit
 * @param {object} params 
 * @param {any} params.conn
 */
const commit = async(params) => {
  if (params === undefined) {
    throw new Error(`rollback 함수는 params 오브젝트 인자가 필요합니다.`);
  }

  if (params.conn === undefined) {
    throw new Error(`rollback 함수는 params.conn 인자가 필요합니다.`);
  }
  const conn = params.conn;

  try {
    await conn.commit();
  } catch (e) {
    // await conn.release();
    await this.releaseConnection({ conn: conn });
    console.error(myDate().format('YYYY-MM-DD HH:mm:ss') + ' error => ', e);
    throw new Error(`rollback 에러가 발생하였습니다.`);
  }
};

// export setting.
exports.getPoolConnection = getPoolConnection;
exports.releaseConnection = releaseConnection;
exports.query = query;
exports.startTransaction = startTransaction;
exports.rollback = rollback;
exports.commit = commit;