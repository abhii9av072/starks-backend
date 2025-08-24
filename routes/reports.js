import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// ✅ Create new report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error });
  }
});

// ✅ Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
});

// ✅ Get single report
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error });
  }
});

// ✅ Update report
router.put("/:id", async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Report not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error });
  }
});

// ✅ Mark as completed
router.patch("/:id/complete", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (report.completed) {
      return res.status(400).json({ message: "Report already completed" });
    }

    report.completed = true;
    report.completedAt = new Date();
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error marking report complete", error });
  }
});

// ✅ Delete report
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
});

export default router;
