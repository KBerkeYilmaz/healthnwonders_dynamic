var express = require("express");
var router = express.Router();
const slugify = require('slugify'); // Assuming you have slugify installed
const cache = require("../helpers/cache");
const Treatment = require("../models/treatment");

/* GET treatments page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("treatment_detail", {
    title: "treatments",
    currentLanguage: currentLanguage,
  });
});

router.get("/:treatmentSlug", async (req, res, next) => {
  const currentLanguage = req.language;
  const treatmentSlug = req.params.treatmentSlug;

  // Use the cached treatments
  const treatments = cache.getTreatmentsCache();
  const treatment = treatments.find(t => {
    // Generate a slug for each treatment based on its name in the current language or fallback
    const nameForSlug = t.name[currentLanguage] || t.name['en']; // Fallback to English if current language is not available
    const generatedSlug = slugify(nameForSlug, { lower: true, strict: true });
    return generatedSlug === treatmentSlug;
  });

  if (!treatment) {
    return next(); // Treatment not found, forward to 404 handler
  }

  res.render("treatment_detail", {
    title: treatment.name[currentLanguage] || treatment.name['en'], // Fallback to English
    treatment,
    currentLanguage,
  });
});

module.exports = router;
