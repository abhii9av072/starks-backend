import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import membersRoutes from "./routes/members.js";
import projectsRoutes from "./routes/projects.js";
import reportsRoutes from "./routes/reports.js"; // ✅ correct

dotenv.config();

const app = express();
app.use(express.json({ limit: "27mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

app.get("/", (req, res) => res.send("StarksHUB API is running"));

// ✅ mount routes
app.use("/api/members", membersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/reports", reportsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 API running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  });
