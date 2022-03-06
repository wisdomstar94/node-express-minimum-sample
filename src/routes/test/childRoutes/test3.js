const express = require('express');
const router = express.Router();
const myMysql = require('../../../librarys/myMysql');

router.get('/', async(req, res, next) => {
  const poolConnection = await myMysql.getPoolConnection({});

  const query = `
    SELECT NOW();
  `;

  const result = await myMysql.query({
    conn: poolConnection.conn,
    query: query,
    values: [
      // 20,
    ],
  });

  await myMysql.releaseConnection({
    conn: poolConnection.conn,
  });

  console.log('result', result);

  const renderData = {
    heads: {
      title: 'test 3',
      metas: [],
      links: [
        `<link href="/public/css/test/test3.css" rel="stylesheet" type="text/css" />`
      ],
      scripts: [
        `<script src="/public/js/test/test3.js"></script>`
      ],
    },
  };
  res.render('test/test3', renderData);
  return;
});

module.exports = router;
