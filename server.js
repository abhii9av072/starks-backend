// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Report schema
const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  author: { type: String, default: "Anonymous" },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

// ✅ Routes

// Get all reports
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Add new report
app.post("/api/reports", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newReport = new Report({ title, description, author });
    await newReport.save();
    res.json(newReport);
  } catch (err) {
    res.status(500).json({ error: "Failed to add report" });
  }
});

// Update report (edit or mark complete)
app.put("/api/reports/:id", async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

// Delete report
app.delete("/api/reports/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
