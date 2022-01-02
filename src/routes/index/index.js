const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const renderData = {
    heads: {
      title: '인덱스',
      metas: [],
      links: [
        `<link href="/public/css/index/index.css" rel="stylesheet" type="text/css" />`
      ],
      scripts: [
        `<script src="/public/js/index/index.js"></script>`
      ],
    },
  };
  res.render('index/index', renderData);
  return;
});

module.exports = router;
