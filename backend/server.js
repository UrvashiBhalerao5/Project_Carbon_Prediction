const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // React frontend URL

app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.post(
  "/api/users",
  [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim()
      .escape(),
    body("username").notEmpty().withMessage("Username is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        message: "User created successfully",
        user: { username: newUser.username, email: newUser.email },
        token,
      });
    } catch (err) {
      console.error("Error while creating user:", err);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error while retrieving users:", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
