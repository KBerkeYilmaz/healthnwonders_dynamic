var express = require("express");
var router = express.Router();

/* GET about us listing. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("services", {
    title: "Hizmetlerimiz",
    currentLanguage: currentLanguage,
  });
});

module.exports = router;
