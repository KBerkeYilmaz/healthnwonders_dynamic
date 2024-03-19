const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Adjust the path based on your project structure

// POST route for user registration
router.post("/register", async (req, res) => {
  try {
    const { userMail, password } = req.body;
    if (!userMail || !password) {
      return res.status(400).json({ message: "Please provide an email and a password." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userMail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // Create a new user
    const user = new User({ userMail, password });
    await user.save();

    // Respond to the request indicating the user was created
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
});

module.exports = router;
