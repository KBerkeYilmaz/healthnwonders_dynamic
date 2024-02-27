var express = require("express");
var router = express.Router();
const Blog = require("../models/blog");

/* GET blogs page. */
router.get("/", function (req, res, next) {
  res.render("blog", { title: "Blog Yazıları" });
});

router.get(`/:blogName`, async (req, res, next) => {
  const blogNameSlug = req.params.blogName;
  const blogName = blogNameSlug.split("-").join(" "); // Reverse the slugification process
  try {
    const blog = await Blog.findOne({ name: blogName });
    if (!blog) return next(); // blog not found, forward to 404 handler
    res.render("blog/blog_detail", { title: blog.name, blog });
  } catch (error) {
    next(error); // Forward to the error handling middleware
  }
});



module.exports = router;
