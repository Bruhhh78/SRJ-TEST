import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;

// Middlewares
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running! Basic CRUD API is ready.",
  });
});

// User CRUD Routes
app.use("/api/users", userRoutes);

// Database Connection and Server Startup
mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("MongoDB Connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
  });