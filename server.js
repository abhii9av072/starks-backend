import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import membersRoutes from "./routes/members.js";
import projectsRoutes from "./routes/projects.js";
import reportsRoutes from "./routes/reports.js";
import { logToDiscord, logFrontendConnection } from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "27mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// root endpoint
app.get("/", (req, res) => {
  logFrontendConnection(req.ip);
  res.send("✅ StarksHUB API is running and connected to frontend!");
});

// routes
app.use("/api/members", membersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/reports", reportsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 API running on http://localhost:${PORT}`);
      logToDiscord(`🚀 API running on port ${PORT} and connected to MongoDB`);
    });
  })
  .catch((e) => {
    console.error("❌ MongoDB connection error:", e.message);
    logToDiscord(`❌ MongoDB connection error: ${e.message}`);
    process.exit(1);
  });
