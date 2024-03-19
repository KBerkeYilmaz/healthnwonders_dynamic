var express = require("express");
var router = express.Router();
const slugify = require("slugify"); // Assuming you have slugify installed
const cache = require("../helpers/cache");
const Treatment = require("../models/treatment");

/* GET treatments page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

});

router.get("/:treatmentSlug", async (req, res, next) => {
  const currentLanguage = req.language;
  const treatmentSlug = req.params.treatmentSlug;

  // Use the cached treatments
  const treatments = cache.getTreatmentsCache();
  const treatment = treatments.find(treatment => {
    // Generate a slug for each treatment based on its name in the current language or fallback
    return treatment.slugs[currentLanguage] === treatmentSlug;
  });

  if (!treatment) {
    return next(); // Blog not found, forward to 404 handler
  }

  res.render("treatment_detail", {
    title: treatment.name[currentLanguage] || treatment.name['en'], // Fallback to English
    treatment,
    currentLanguage,
  });
});

module.exports = router;
