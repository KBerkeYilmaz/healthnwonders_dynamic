var express = require('express');
var router = express.Router();
const { getNestedTranslations } = require('../helpers/translation');

/* GET about us listing. */
router.get('/', function(req, res, next) {
  // const aboutUsTranslations = getNestedTranslations('aboutUs', req);
  // console.log('About us translations:', aboutUsTranslations);
  res.render('about', { t: req.t });
});

module.exports = router;
