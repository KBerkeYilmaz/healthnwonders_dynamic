var express = require("express");
var router = express.Router();

/* GET about us listing. */
router.get("/", function (req, res, next) {
  // const aboutUsTranslations = getNestedTranslations('aboutUs', req);
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("about", { t: req.t, currentLanguage: currentLanguage, title:req.t('route_titles.about_us_page_title')
});
});

module.exports = router;
