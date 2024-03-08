var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("appointment", {
    title: "Bize Ulaşın",
    currentLanguage: currentLanguage,
  });
});

module.exports = router;
