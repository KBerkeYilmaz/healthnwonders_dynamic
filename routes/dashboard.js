var express = require("express");
var router = express.Router();
const Doctor = require("../models/doctor");
const Treatment = require("../models/treatment");
const Blog = require("../models/blog");

/* GET dashboard page. */
router.get("/", function (req, res, next) {
  res.render("dashboard", { title: "Dashboard" });
  
});

/* GET doctors page. */
router.get("/doctors", function (req, res, next) {
  res.render("dashboard/doctors", { title: "Doktorlar" });
});



router.post("/doctors/new", async (req, res) => {
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
    res

      .status(201)
      .redirect("/doctors");
  } catch (error) {
    console.error("Failed to add new doctor:", error);
    res
      .status(500)
      .json({ message: "Error adding new doctor", error: error.message });
  }
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
    res.render("dashboard/blog", { title: "Blog Yazıları", treatments });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});

router.post("/blog/new", async (req, res) => {
  const { name, description, thumbnailDescription, thumbnailName } =
    req.body;
  console.log(req.body);
  try {
    const newBlog = new Blog({
      name,
      description,
      thumbnailDescription,
      thumbnailName,
    });

    await newBlog.save();
    res
    .status(201)
    .redirect("/dashboard/blog");
  } catch (error) {
    console.error("Failed to add new post:", error);
    res
      .status(500)
      .json({ message: "Error adding new post", error: error.message });
  }
});



module.exports = router;
