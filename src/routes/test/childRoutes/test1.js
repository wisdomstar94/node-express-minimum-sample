const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const renderData = {
    heads: {
      title: 'test 1',
      metas: [],
      links: [
        `<link href="/public/css/test/test1.css" rel="stylesheet" type="text/css" />`
      ],
      scripts: [
        `<script src="/public/js/test/test1.js"></script>`
      ],
    },
  };
  res.render('test/test1', renderData);
  return;
});

module.exports = router;
