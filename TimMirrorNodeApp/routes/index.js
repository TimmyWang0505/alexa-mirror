var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tim\'s Mirror' });
});

/* GET home page. */
router.get('/ppt', function(req, res, next) {
  res.render('ppt', { title: 'Talk to the Future' });
});

module.exports = router;
