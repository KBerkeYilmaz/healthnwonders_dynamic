require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compression = require("compression");
const connectDB = require("./lib/database");
const cache = require("./helpers/cache");
const session = require('express-session');
const MongoStore = require('connect-mongo');


// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var aboutUsRouter = require("./routes/about-us");
var dashboardRouter = require("./routes/dashboard");
var doctorsRouter = require("./routes/doctors");
var treatmentsRouter = require("./routes/treatments");
var blogRouter = require("./routes/blog");
var servicesRouter = require("./routes/services");
var faqRouter = require("./routes/faq");
var appointmentRouter = require("./routes/appointment");
var loginRouter = require("./routes/login");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");

var app = express();

// Connect to Database
connectDB();

//required models
const Doctor = require("./models/doctor");
const Treatment = require("./models/treatment");
const Blog = require("./models/blog");
const Faq = require("./models/faq");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(compression());
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else {
  // 'tiny' or 'combined' can be used in production for less verbose logs
  app.use(logger("combined"));
}
app.use(express.json());

// For simple form data
// app.use(express.urlencoded({ extended: false }));

// For complex, nested form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize the cache

// In your cache helper/module
let cacheInitialized = false;

async function initializeCaches() {
  if (cacheInitialized) return;

  // console.log("Initializing caches...");
  try {
    const doctorsList = await Doctor.find({}).lean();
    // console.log("Doctors list:", doctorsList);
    cache.setDoctorsCache(doctorsList);

    const treatmentList = await Treatment.find({}).lean();
    cache.setTreatmentsCache(treatmentList);

    const blogList = await Blog.find({}).lean();
    // console.log("Blog list:", blogList);
    cache.setBlogsCache(blogList);

    cacheInitialized = true; // Prevent further initialization
  } catch (error) {
    // console.error("Error initializing caches:", error);
  }
}

// In your app.js or a similar entry point
initializeCaches().then(() => {
  console.log("Caches initialized.");
});

// Adjust your middleware to simply attach the cache to res.locals without checking or initializing
app.use((req, res, next) => {
  res.locals.doctors = cache.getDoctorsCache();
  // console.log("Doctors:", res.locals.doctors);
  res.locals.treatments = cache.getTreatmentsCache();
  // console.log("Treatments:", res.locals.treatments);
  res.locals.blogs = cache.getBlogsCache();
  // console.log("Blogs:", res.locals.blogs);
  next();
});

//---------------------------------- INTERNATIONALIZATION AND LOCALIZATION ----------------------------------

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    backend: {
      loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
      addPath: __dirname + "/locales/{{lng}}/{{ns}}.missing.json",
    },
    detection: {
      order: ["querystring", "cookie"],
      // order: ["path", "cookie"],
      caches: ["cookie"],
    },
    lng:"tr",
    fallbackLng: "tr",
    preload: ["tr", "en", "de", "fr"],
    saveMissing: true,
  });

//---------------------------------- INTERNATIONALIZATION AND LOCALIZATION END ----------------------------------




// MIDDLEWARES
app.use(i18nextMiddleware.handle(i18next));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: true, maxAge: 1000 * 60 * 60 } // Example: 1 hour
}));




// ROUTE HANDLER 
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/about-us", aboutUsRouter);
app.use("/dashboard", dashboardRouter);
app.use("/doctors", doctorsRouter);
app.use("/treatments", treatmentsRouter);
app.use("/blog", blogRouter);
app.use("/services", servicesRouter);
app.use("/faq", faqRouter);
app.use("/appointment", appointmentRouter);
app.use("/login", loginRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
