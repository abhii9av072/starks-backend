import express from "express";
import Member from "../models/Member.js";
import { logDB } from "../utils/logger.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    logDB("CREATE", "Member", req.body);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    logDB("READ", "Member", { count: members.length });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    logDB("UPDATE", "Member", updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    logDB("DELETE", "Member", deleted);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
