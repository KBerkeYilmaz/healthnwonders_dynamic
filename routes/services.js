var express = require('express');
var router = express.Router();

/* GET about us listing. */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Hizmetlerimiz' });
});

module.exports = router;
