const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
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
