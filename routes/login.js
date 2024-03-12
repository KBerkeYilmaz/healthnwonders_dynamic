var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET login page. */
router.get("/", function (req, res, next) {
  const currentLanguage = req.language; // This should reflect the current language used in rendering
  if(req.session.user) return res.redirect("/dashboard");
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
      const user = await User.findOne({ userMail });
  
      // Log the result of the user search
      if (!user) {
        return res.status(401).send("Authentication failed. User not found.");
      } 
      const isMatch = await user.comparePassword(password);
  
      if (isMatch) {  
        // Set user information in session
        req.session.user = {
          id: user._id,
          userMail: user.userMail,
        };
  
        // Save the session and redirect
        req.session.save((err) => {
          if (err) {
            return res.status(500).send("Internal server error.");
          }
          res.redirect("/dashboard");
        });
      } else {
        res.status(401).send("Authentication failed. Wrong password.");
      }
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  });
  
module.exports = router;
