var express = require("express");
var router = express.Router();
const { getNestedTranslations } = require("../helpers/translation");

/* GET about us listing. */
router.get("/", function (req, res, next) {
  // const aboutUsTranslations = getNestedTranslations('aboutUs', req);
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("about", { t: req.t, currentLanguage: currentLanguage });
});

module.exports = router;
