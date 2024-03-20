const slugify = require("slugify");
const cache = require("./cache");
const Doctor = require("../models/doctor");
const Treatment = require("../models/treatment");
const Blog = require("../models/blog");


let cacheInitialized = false;

async function initializeCaches() {

    const supportedLanguages = ["en", "fr", "de", "tr"]; // Set of supported languages

  if (cacheInitialized) return;

  // console.log("Initializing caches...");
  try {

    const doctorsList = await Doctor.find({}).lean();
    // console.log("Doctors list:", doctorsList);
    cache.setDoctorsCache(doctorsList);

    const treatmentList = await Treatment.find({}).lean();

    const slugifiedTreatmentList = treatmentList.map((treatment) => ({
      ...treatment,
      slugs: supportedLanguages.reduce((acc, lang) => {
        acc[lang] = slugify(treatment.name[lang] || treatment.name["tr"], {
          lower: true,
          strict: true,
        }); // Fallback to Turkish if specific language name is not available
        return acc;
      }, {}),
    }));


    console.log("Treatment list:", slugifiedTreatmentList);
    cache.setTreatmentsCache(slugifiedTreatmentList);

    const blogList = await Blog.find({}).lean();

    const slugifiedBlogList = blogList.map((blog) => ({
      ...blog,
      slugs: supportedLanguages.reduce((acc, lang) => {
        acc[lang] = slugify(blog.name[lang] || blog.name["tr"], {
          lower: true,
          strict: true,
        }); // Fallback to Turkish if specific language name is not available
        return acc;
      }, {}),
    }));

    console.log("Blog list with slugs:", slugifiedBlogList);
    cache.setBlogsCache(slugifiedBlogList)
    cacheInitialized = true; // Prevent further initialization
  } catch (error) {
    console.error("Error initializing caches:", error);
  }
}

module.exports = initializeCaches;
