const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const renderData = {
    heads: {
      title: 'test 2',
      metas: [],
      links: [
        `<link href="/public/css/test/test2.css" rel="stylesheet" type="text/css" />`
      ],
      scripts: [
        `<script src="/public/js/test/test2.js"></script>`
      ],
    },
  };
  res.render('test/test2', renderData);
  return;
});

module.exports = router;
