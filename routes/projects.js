import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const { topic, startDate, endDate, description, completed } = req.body;
  if (!topic || !startDate || !description)
    return res.status(400).json({ message: 'Missing fields' });
  const created = await Project.create({ topic, startDate, endDate, description, completed });
  res.status(201).json(created);
});

export default router;