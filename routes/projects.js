import express from "express";
import Project from "../models/Project.js";
import { logDB } from "../utils/logger.js";

const router = express.Router();

// 📌 Create Project
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    logDB("CREATE", "Project", req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Update Project
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    logDB("UPDATE", "Project", updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Delete Project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    logDB("DELETE", "Project", deleted);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get all Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    logDB("READ", "Project", { count: projects.length });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
