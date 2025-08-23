import { Router } from 'express';
import Member from '../models/Member.js';

const router = Router();

// Get all members
router.get('/', async (req, res) => {
  const members = await Member.find().sort({ createdAt: 1 });
  res.json(members);
});

// Create member – enforce max 5
router.post('/', async (req, res) => {
  const count = await Member.countDocuments();
  if (count >= 5) return res.status(400).json({ message: 'Maximum of 5 members reached' });

  const { name, klass, skills, bio, avatar } = req.body;
  if (!name || !klass || !skills || !bio)
    return res.status(400).json({ message: 'Missing fields' });

  const created = await Member.create({ name, klass, skills, bio, avatar });
  res.status(201).json(created);
});

// Delete member
router.delete('/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;