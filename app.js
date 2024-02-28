require("dotenv").config();


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compression = require('compression');
const connectDB = require("./lib/database");

// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var aboutUsRouter = require("./routes/about-us");
var dashboardRouter = require("./routes/dashboard");
var doctorsRouter = require("./routes/doctors");
var treatmentsRouter = require('./routes/treatments');
var blogRouter = require('./routes/blog'); 
var servicesRouter = require('./routes/services');
var faqRouter = require('./routes/faq');
var appointmentRouter = require('./routes/appointment');

var app = express();

// Connect to Database
connectDB();


//required models
const Doctor = require('./models/doctor'); 
const Treatment = require('./models/treatment'); 
const Blog = require('./models/blog'); 
const Faq = require('./models/faq');


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(compression());
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else {
  // 'tiny' or 'combined' can be used in production for less verbose logs
  app.use(logger('combined'));
}
app.use(express.json());

// For simple form data
// app.use(express.urlencoded({ extended: false }));

// For complex, nested form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware to attach doctors list to all responses
let doctorsCache;

app.use(async (req, res, next) => {
  if (!doctorsCache) {
    console.log('Cache miss');
    try {
      const doctorsList = await Doctor.find({});
      doctorsCache = doctorsList;
      // Set a timeout to invalidate cache after a certain period
      setTimeout(() => { doctorsCache = null; }, 60000 * 15); // Invalidate cache after 10 seconds
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return next(error);
    }
  } else {
    console.log('Cache hit');
  }
  res.locals.doctors = doctorsCache;
  next();
});


// Middleware to attach treatment list to all responses
let treatmentsCache;

app.use(async (req, res, next) => {
  if (!treatmentsCache) {
    console.log('Cache miss');
    try {
      const treatmentList = await Treatment.find({});
      treatmentsCache = treatmentList;
      // Set a timeout to invalidate cache after a certain period
      setTimeout(() => { treatmentsCache = null; }, 60000 * 15); // Invalidate cache after 10 seconds
    } catch (error) {
      console.error('Error fetching treatments:', error);
      return next(error);
    }
  } else {
    console.log('Cache hit');
  }
  res.locals.treatments = treatmentsCache;
  next();
});

// Middleware to attach blog list to all responses
let blogCache;

app.use(async (req, res, next) => {
  if (!blogCache) {
    console.log('Cache miss');
    try {
      const blogList = await Blog.find({});
      blogCache = blogList;
      // Set a timeout to invalidate cache after a certain period
      setTimeout(() => { blogCache = null; }, 60000 * 15); // Invalidate cache after 10 seconds
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return next(error);
    }
  } else {
    console.log('Cache hit');
  }
  res.locals.blogs = blogCache;
  next();
});


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/about-us", aboutUsRouter);
app.use("/dashboard", dashboardRouter);
app.use("/doctors", doctorsRouter);
app.use('/treatments', treatmentsRouter);
app.use('/blog', blogRouter);
app.use('/services', servicesRouter);
app.use('/faq', faqRouter)
app.use('/appointment', appointmentRouter)



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
