import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator"; // Import validation methods

const router = express.Router();

// Sign-up route
router.post(
  "/signup",  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log(`User with email ${newUser.email} is created`);

      res.status(201).json({
        message: "User registered successfully",
        user: { name: newUser.name, email: newUser.email },
        token,
      });
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log(`User with email ${user.email} is logged in`);

      res.status(200).json({
        token,
        message: "Logged in successfully",
        user: { name: user.name, email: user.email },
      });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
