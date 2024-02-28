var express = require("express");
var router = express.Router();
const Blog = require("../models/blog");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Health and Wonders" });
});




// API BLOG
router.post("/api/blog", async (req, res) => {
  const { name, description, thumbnailDescription, thumbnailName } = req.body;
  console.log(req.body);
  try {
    const newBlog = new Blog({
      name,
      description,
      thumbnailDescription,
      thumbnailName,
    });

    await newBlog.save();
    res.status(201).redirect("/dashboard/blog");
  } catch (error) {
    console.error("Failed to add new post:", error);
    res
      .status(500)
      .json({ message: "Error adding new post", error: error.message });
  }
});






// API DOCTORS
router.post("/api/doctors", async (req, res) => {
  const { name, specialty, location, bio, interests, education, experiences } =
    req.body;
  console.log(req.body);
  try {
    const newDoctor = new Doctor({
      name,
      specialty,
      location,
      bio,
      interests,
      education,
      experiences,
    });

    await newDoctor.save();
    res.status(201).redirect("/dashboard/doctors");
  } catch (error) {
    console.error("Failed to add new doctor:", error);
    res
      .status(500)
      .json({ message: "Error adding new doctor", error: error.message });
  }
});




// API TREATMENTS
router.post("/api/treatments", async (req, res) => {
  const { name, subTitle, abstract, description } =
    req.body;
  console.log(req.body);
  try {
    const newTreatment = new Treatment({
      name,
      subTitle,
      description,
      abstract,
    });

    await newTreatment.save();
    res
    .status(201)
    .redirect("/dashboard");
  } catch (error) {
    console.error("Failed to add new treeament:", error);
    res
      .status(500)
      .json({ message: "Error adding new treeament", error: error.message });
  }
});



module.exports = router;
