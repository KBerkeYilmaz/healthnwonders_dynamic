var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET login page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  res.render("login", {
    t: req.t,
    currentLanguage: currentLanguage,
    title: "Login",
  });
});

// Login route
router.post("/", async (req, res) => {
  const { userMail, password } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ userMail });
    if (!user) {
      // User not found
      return res.status(401).send("Authentication failed. User not found.");
    }

    // Compare submitted password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    console.log("isMatch", isMatch);
    if (isMatch) {
      console.log("user", user._id);
      // Passwords match
      // Set user information in session
      req.session.user = {
        id: user._id,
        userMail: user.userMail,
      };
      // Redirect to dashboard
      res.redirect(`/dashboard`);
    } else {
      // Passwords do not match
      res.status(401).send("Authentication failed. Wrong password.");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
