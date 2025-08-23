import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { logToDiscord } from "./utils/logger.js";  // ✅

import membersRoutes from "./routes/members.js";
import projectsRoutes from "./routes/projects.js";
import reportsRoutes from "./routes/reports.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "27mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// Middleware to log every request
app.use((req, res, next) => {
  logToDiscord(`📥 Request: **${req.method}** ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("StarksHUB API is running");
  logToDiscord("✅ Root endpoint hit (`/`)");
});

// Mount routes
app.use("/api/members", membersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/reports", reportsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      const msg = `🚀 API running on port ${PORT} (public: ${process.env.PUBLIC_URL || "set PUBLIC_URL env"})`;
      console.log(msg);
      logToDiscord(msg);
    });
  })
  .catch((e) => {
    const msg = `❌ MongoDB connection error: ${e.message}`;
    console.error(msg);
    logToDiscord(msg);
    process.exit(1);
  });
