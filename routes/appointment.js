var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("appointment", {
    title: "Bize Ulaşın"
  });
});

module.exports = router; 