var express = require("express");
var router = express.Router();
const slugify = require("slugify"); // Assuming you have slugify installed
const cache = require("../helpers/cache");

/* GET blogs page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("blog", {
    title: "Blog Yazıları",
    currentLanguage: currentLanguage,
  });
});

router.get("/:blogSlug", async (req, res, next) => {
  const currentLanguage = req.language; // Determine the current language
  const blogSlug = req.params.blogSlug; // The slug from the URL

  // Use the cached blogs
  const blogs = cache.getBlogsCache(); // Assume this fetches your blogs
  const blog = blogs.find((blog) => {
    // Dynamically generate a slug for each blog based on its name in the current language or fallback to English
    const nameForSlug = blog.name[currentLanguage] || blog.name["en"];
    const generatedSlug = slugify(nameForSlug, { lower: true, strict: true });
    return generatedSlug === blogSlug;
  });

  if (!blog) {
    return next(); // Blog not found, forward to 404 handler
  }

  res.render("blog/blog_detail", {
    title: blog.name[currentLanguage] || blog.name["en"], // Fallback to English if necessary
    blog,
    currentLanguage,
  });
});

module.exports = router;
