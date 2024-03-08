var express = require("express");
var router = express.Router();

/* GET admin page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("faq", { title: "FAQ", currentLanguage: currentLanguage });
});

module.exports = router;
