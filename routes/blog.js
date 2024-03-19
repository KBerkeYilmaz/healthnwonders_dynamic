var express = require("express");
var router = express.Router();
const slugify = require("slugify"); // Assuming you have slugify installed
const cache = require("../helpers/cache");

/* GET blogs page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language;
  const blogs = cache.getBlogsCache().map(blog => ({
    ...blog,
    slug: slugify(blog.name[currentLanguage] || blog.name["en"], { lower: true, strict: true })
  }));
  
  res.render("blog", {
    title: req.t("route_titles.blog_page_title"),
    blogs, 
    currentLanguage,
  });
});

router.get("/:blogSlug", async (req, res, next) => {
  const currentLanguage = req.language;
  const blogSlug = req.params.blogSlug;

  // Use the cached blogs
  const blogs = cache.getBlogsCache(); 
  const blog = blogs.find(blog => {
    // Check if the slug in the current language matches the requested slug
    return blog.slugs[currentLanguage] === blogSlug;
  });

  if (!blog) {
    return next(); // Blog not found, forward to 404 handler
  }

  res.render("blog/blog_detail", {
    title: blog.name[currentLanguage] || blog.name["tr"], // Fallback to Turkish if necessary
    blog,
    currentLanguage,
  });
});

module.exports = router;
