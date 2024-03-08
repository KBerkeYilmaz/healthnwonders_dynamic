var express = require("express");
var router = express.Router();
const Blog = require("../models/blog");

/* GET blogs page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("blog", {
    title: "Blog Yazıları",
    currentLanguage: currentLanguage,
  });
});

router.get(`/:blogName`, async (req, res, next) => {
  const currentLanguage = req.language; // This should reflect the current language used in rendering

  const blogNameSlug = req.params.blogName;
  const blogName = blogNameSlug.split("-").join(" "); // Reverse the slugification process
  try {
    const blog = await Blog.findOne({ name: blogName });
    if (!blog) return next(); // blog not found, forward to 404 handler
    res.render("blog/blog_detail", { title: blog.name, blog, currentLanguage: currentLanguage  });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});

module.exports = router;
