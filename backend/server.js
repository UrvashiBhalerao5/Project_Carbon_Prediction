import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // Import auth routes

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins (consider restricting this in production)
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.get("/", (req, res) => {
  console.log("Got request at homepage");
  res.send("<h1>Welcome to Server API</h1>");
});

// Register auth routes
app.use("/api/auth", authRoutes); // This ensures /signin and /signup are correctly routed

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "localhost", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
