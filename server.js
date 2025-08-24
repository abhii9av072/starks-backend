import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Report schema
const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

// Routes
app.get("/api/reports", async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

app.post("/api/reports", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Missing fields" });

  const newReport = new Report({ title, content });
  await newReport.save();
  res.json(newReport);
});

app.delete("/api/reports/:id", async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Render needs this
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
