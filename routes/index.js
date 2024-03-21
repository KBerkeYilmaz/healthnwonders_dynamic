var express = require("express");
var router = express.Router();
var { upload } = require("../middlewares/multer");

const cache = require("../helpers/cache");
const Blog = require("../models/blog");
const Doctor = require("../models/doctor");
const Treatment = require("../models/treatment");

/* GET home page. */
router.get("/", function (req, res, next) {
  // const currentLanguage = req.cookies.i18next || 'defaultLanguageCode'; // Fallback to a default language code if the cookie doesn't exist
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  res.render("index", {
    t: req.t,
    currentLanguage: currentLanguage,
    title: req.t("route_titles.index_page_title"),
  });
});

//------------------------ API BLOG ----------------
router.post("/api/blog", upload.single("picture"), async (req, res) => {
  const { name, thumbnailDescription, description } = req.body; // Removed description, thumbnailName as it seems to be not used in this scope
  let picture = req.file ? req.file.path : ""; // Adjust if you have a default picture or another handling
  picture = picture.replace(/^public\//, "");

  try {
    const newBlog = new Blog({
      name,
      description,
      thumbnailDescription,
      image: picture, // Assuming 'image' is the field in your Blog model for storing the picture path
    });

    await newBlog.save();
    if (newBlog) {
      cache.addBlogToCache(newBlog);
      res.status(201).redirect("/dashboard/blog");
    }
  } catch (error) {
    console.error("Failed to add new blog post:", error);
    res
      .status(500)
      .json({ message: "Error adding new blog post", error: error.message });
  }
});

//------------------------ API DOCTORS ----------------
// POST
router.post("/api/doctors", upload.single("profilePic"), async (req, res) => {
  const { name, specialty, location, bio, interests, education, experiences } =
    req.body;
  const profilePic = req.file ? req.file.path : ""; // Adjust if you have a default picture or another handling

  try {
    const newDoctor = new Doctor({
      name,
      specialty,
      location,
      bio,
      interests,
      education,
      experiences,
      profilePic,
    });

    await newDoctor.save();
    if (newDoctor) {
      cache.addDoctorToCache(newDoctor);
      res.status(201).redirect("/dashboard/doctors");
    }
  } catch (error) {
    console.error("Failed to add new doctor:", error);
    res
      .status(500)
      .json({ message: "Error adding new doctor", error: error.message });
  }
});

// DELETE
router.delete("/api/doctors/:id", async (req, res) => {
  try {
    const result = await Doctor.findByIdAndDelete(req.params.id);
    if (result) {
      cache.updateDoctorsCache(req.params.id);
      res
        .status(200)
        .json({ message: "Doctor successfully deleted.", id: req.params.id });
    } else {
      res.status(404).json({
        message: "Doctor not found with provided ID.",
        id: req.params.id,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.toString() });
  }
});

//-------------- API TREATMENTS ----------------
// POST
router.post("/api/treatments", async (req, res) => {
  const { name, subTitle, abstract, description, youtubeLink } = req.body;
  
  try {
    const newTreatment = await new Treatment({
      name,
      subTitle,
      description,
      abstract,
      youtubeLink,
    }).save();

    cache.addTreatmentToCache(newTreatment);
    res.status(201).redirect("/dashboard");
  } catch (error) {
    console.error("Failed to add new treatment:", error);
    res.status(500).json({ message: "Error adding new treatment", error: error.message });
  }
});

//DELETE
router.delete("/api/treatments/:id", async (req, res) => {
  try {
    const result = await Treatment.findByIdAndDelete(req.params.id);
    if (result) {
      cache.updateDoctorsCache(req.params.id);
      res.status(200).json({
        message: "Treatment successfully deleted.",
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        message: "Treatment not found with provided ID.",
        id: req.params.id,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.toString() });
  }
});

router.get("/change-lang/:lang", (req, res) => {
  const newLang = req.params.lang;
  req.i18n.changeLanguage(newLang, (err) => {
    if (err) console.error("Language change error:", err);
    res.redirect("back");
  });
});

// -------------------------- Dynamic Route Handlers --------------------------

// -------ABOUT US--------
router.get(
  ["/about-us", "/hakkimizda", "/uber-uns", "/a-propos-de-nous"],
  function (req, res, next) {
    const currentLanguage = req.language; // This should reflect the current language used in rendering
    res.render("about", {
      currentLanguage: currentLanguage,
      title: req.t("route_titles.about_us_page_title"),
    });
  }
);

// -------FAQ--------
router.get(
  [
    "/faq",
    "/sik-sorulan-sorular",
    "/oft-gestellte-fragen",
    "/questions-frequemment-posees",
  ],
  function (req, res, next) {
    const currentLanguage = req.language;
    res.render("faq", { title: "FAQ", currentLanguage: currentLanguage });
  }
);

// ----------SERVICES----------
router.get(
  ["/services", "/our-services", "/hizmetlerimiz", "/dienstleistungen"],
  function (req, res, next) {
    const currentLanguage = req.language; // This should reflect the current language used in rendering

    res.render("services", {
      title: req.t("route_titles.services_page_title"),
      currentLanguage: currentLanguage,
    });
  }
);

// ----------CONTACT US----------
router.get(
  ["/contact-us", "/bize-ulasin", "/kontaktiere-uns", "/contactez-nous"],
  function (req, res, next) {
    const currentLanguage = req.language; // This should reflect the current language used in rendering

    res.render("appointment", {
      title: req.t("route_titles.appointment_page_title"),
      currentLanguage: currentLanguage,
    });
  }
);

module.exports = router;
