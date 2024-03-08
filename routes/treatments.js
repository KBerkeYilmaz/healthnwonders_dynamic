var express = require("express");
var router = express.Router();
const Treatment = require("../models/treatment");

/* GET treatments page. */
router.get("/", function (req, res, next) {
  res.render("treatment_detail", {
    title: "treatments",
    currentLanguage: currentLanguage,
  });
});

router.get(`/:treatmentName`, async (req, res, next) => {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  const treatmentNameSlug = req.params.treatmentName;
  const treatmentName = treatmentNameSlug.split("-").join(" "); // Reverse the slugification process
  try {
    const treatment = await Treatment.findOne({ name: treatmentName });
    if (!treatment) return next(); // treatment not found, forward to 404 handler
    res.render("treatment_detail", {
      title: treatment.name,
      treatment,
      currentLanguage: currentLanguage,
    });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});

module.exports = router;
