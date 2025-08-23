import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import membersRoutes from "./routes/members.js";
import projectsRoutes from "./routes/projects.js";
import reportsRoutes from "./routes/reports.js";
import { logToDiscord } from "./utils/logger.js";  // ✅ import logger

dotenv.config();

const app = express();
app.use(express.json({ limit: "27mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// ✅ Middleware: Log every request
app.use((req, res, next) => {
  const logMsg = `📡 [${req.method}] ${req.originalUrl} from ${req.ip}`;
  console.log(logMsg);
  logToDiscord(logMsg);
  next();
});

app.get("/", (req, res) => {
  const msg = "✅ StarksHUB API is running (Frontend Connected)";
  console.log(msg);
  logToDiscord(msg);
  res.send(msg);
});

// ✅ mount routes
app.use("/api/members", membersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/reports", reportsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const msg = `🚀 API running on http://localhost:${PORT}`;
    console.log(msg);
    logToDiscord(msg);
    app.listen(PORT, () => console.log(msg));
  })
  .catch((e) => {
    const errMsg = `❌ MongoDB connection error: ${e.message}`;
    console.error(errMsg);
    logToDiscord(errMsg);
    process.exit(1);
  });

// 🔴 Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  const msg = `💥 Uncaught Exception: ${err.message}\n\`\`\`${err.stack}\`\`\``;
  console.error(msg);
  logToDiscord(msg);
});

// ⚠️ Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  const msg = `⚠️ Unhandled Rejection: ${reason instanceof Error ? reason.message : reason}`;
  console.error(msg);
  logToDiscord(msg);
});
