const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST: Create a new user
router.post("/api/users", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Save to DB
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
    