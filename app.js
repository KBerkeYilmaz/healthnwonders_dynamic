require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compression = require("compression");
const helmet = require("helmet");
const connectDB = require("./lib/database");
const cache = require("./helpers/cache");
const session = require("express-session");
const slugify = require("slugify");
const MongoStore = require("connect-mongo");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const RateLimit = require("express-rate-limit");
const initializeCaches = require("./helpers/initializeCaches");


// ROUTERS
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboardRouter = require("./routes/dashboard");
var doctorsRouter = require("./routes/doctors");
var treatmentsRouter = require("./routes/treatments");
var blogRouter = require("./routes/blog");
var loginRouter = require("./routes/login");
var aboutRouter = require("./routes/about-us");
// Initialize express app
var app = express();

// Connect to Database and setup the cache
let cacheInitialized = false;
app.use(express.json());

// Apply rate limiter to all requests
app.use(limiter);

connectDB().then(() => {
  initializeCaches().then(() => {
    console.log("Caches initialized.");
  });
});


// Set up rate limiter: maximum of hundred requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2500,
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else {
  app.use(logger("combined"));
}

app.use(compression()); // Compress all routes

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
//     },
//   }),
// );

// For simple form data
// app.use(express.urlencoded({ extended: false }));
// For complex, nested form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));


// ---------------------------------- CACHE MIDDLEWARE ----------------------------------
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
    lng: "tr",
    fallbackLng: "tr",
    preload: ["tr", "en", "de", "fr"],
    saveMissing: true,
  });

//---------------------------------- INTERNATIONALIZATION AND LOCALIZATION END ----------------------------------

// MIDDLEWARES
app.use(i18nextMiddleware.handle(i18next));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // Example: 1 hour
  })
);


// ROUTE HANDLER
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/doctors", doctorsRouter);
app.use("/treatments", treatmentsRouter);
app.use("/blog", blogRouter);
app.use("/login", loginRouter);
app.use("/about-us", aboutRouter);
// app.use((req, res, next) => {
//   res.locals.currentLanguage = req.language;
//   next();
// });

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
