var express = require('express');
var router = express.Router();

/* GET about us listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource about-us');
});

module.exports = router;
