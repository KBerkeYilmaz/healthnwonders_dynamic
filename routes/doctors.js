var express = require('express');
var router = express.Router();
const Doctor = require('../models/doctor'); // Ensure you have the correct path to your Doctor model


/* GET doctor detail page. */
router.get(`/:doctorName`, async (req, res, next) => {
  
    const currentLanguage = req.language; // This should reflect the current language used in rendering
    const doctorNameSlug = req.params.doctorName;
    const doctorName = doctorNameSlug.split('-').join(' '); // Reverse the slugification process
    try {
      const doctor = await Doctor.findOne({ name: doctorName });
      if (!doctor) return next(); // Doctor not found, forward to 404 handler
      if (doctor.experiences && doctor.experiences.length > 0) {
        doctor.experiences.sort((a, b) => {
          // Assuming startDate is stored as a year (number). Adjust if stored differently.
          // Sort experiences in descending order by startDate
          return b.startDate - a.startDate;
        });
      }
      
      res.render('doctor_detail', { title: doctor.name, doctor,  currentLanguage: currentLanguage  });
    } catch (error) {
      next(error); // Forward to the error handling middleware
    }
  });
  

module.exports = router;
