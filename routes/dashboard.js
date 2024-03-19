var express = require("express");
var router = express.Router();
const Doctor = require("../models/doctor");
const Treatment = require("../models/treatment");
const Blog = require("../models/blog");
const isAuthenticated = require("../middlewares/auth");

/* GET dashboard page. */
router.get("/", isAuthenticated, (req, res, next) => {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("dashboard", {
    title: "Dashboard",
    currentLanguage: currentLanguage,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.redirect("/");
  });
});

/* GET doctors page. */
router.get("/doctors", isAuthenticated, function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("dashboard/doctors", {
    title: "Doktorlar",
    currentLanguage: currentLanguage,
  });
});

/* GET treatments page. */
router.get("/treatments", isAuthenticated, async (req, res, next) => {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("dashboard/treatments", {
    title: "Tedaviler",
    currentLanguage: currentLanguage,
  });
});

/************* GET blog page. *********************/
router.get("/blog", isAuthenticated, async (req, res, next) => {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("dashboard/blog", {
    title: "Blog",
    currentLanguage: currentLanguage,
  });
});

module.exports = router;
