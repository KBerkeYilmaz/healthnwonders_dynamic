require("dotenv").config();


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
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

app.use(logger("dev"));
app.use(express.json());

// For simple form data
// app.use(express.urlencoded({ extended: false }));

// For complex, nested form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware to attach doctors list to all responses
app.use(async (req, res, next) => {
  try {
    const doctorsList = await Doctor.find({});
    res.locals.doctors = doctorsList; // This makes `doctors` available in all templates
    next();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    next(error);
  }
});

// Middleware to attach treatment list to all responses
app.use(async (req, res, next) => {
  try {
    const treatmentList = await Treatment.find({});
    res.locals.treatments = treatmentList; // This makes `treatments` available in all templates
    next();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    next(error);
  }
});

// Middleware to attach blog list to all responses
app.use(async (req, res, next) => {
  try {
    const blog = await Blog.find({});
    res.locals.blogs = blog; // This makes `blog` available in all templates
    next();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    next(error);
  }
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
