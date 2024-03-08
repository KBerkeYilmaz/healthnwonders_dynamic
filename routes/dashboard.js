var express = require("express");
var router = express.Router();
const Doctor = require("../models/doctor");
const Treatment = require("../models/treatment");
const Blog = require("../models/blog");

/* GET dashboard page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("dashboard", {
    title: "Dashboard",
    currentLanguage: currentLanguage,
  });
});

/* GET doctors page. */
router.get("/doctors", function (req, res, next) {
  res.render("dashboard/doctors", { title: "Doktorlar" });
});

/* GET treatments page. */
router.get("/treatments", async (req, res, next) => {
  try {
    const treatments = await Treatment.find({});
    res.render("dashboard/treatments", { title: "Tedaviler", treatments });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});

/************* GET blog page. *********************/
router.get("/blog", async (req, res, next) => {
  try {
    const treatments = await Blog.find({});
    res.render("dashboard/blog", { title: "Admin", treatments });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});

module.exports = router;
