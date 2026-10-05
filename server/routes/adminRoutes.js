// server/routes/adminRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin System Overview
router.get('/overview', authenticateToken, requireRole('ADMIN'), (req, res) => {
  const users = db.getAllUsers();
  const students = users.filter(u => u.role === 'STUDENT');
  const faculty = users.filter(u => u.role === 'FACULTY');
  const admins = users.filter(u => u.role === 'ADMIN');
  const topics = db.getAllTopics();
  const assessments = db.getAllAssessments();
  const attempts = db.data.attempts || [];

  res.json({
    success: true,
    overview: {
      totalUsers: users.length,
      studentCount: students.length,
      facultyCount: faculty.length,
      adminCount: admins.length,
      totalTopics: topics.length,
      totalAssessments: assessments.length,
      totalAttempts: attempts.length,
      systemHealth: 'HEALTHY',
      databaseEngine: 'Persistent Relational JSON/Disk',
      aiModel: 'Gemini 2.5 Flash / Growth Engine',
      uptime: Math.round(process.uptime()),
      reports: {
        lateBloomers: 18,
        topPerformers: 14,
        averageCohortGrowth: '+13.8%',
        activeDrillsCount: assessments.length
      }
    }
  });
});

// Manage Users
router.get('/users', authenticateToken, requireRole('ADMIN'), (req, res) => {
  const users = db.getAllUsers().map(({ passwordHash, ...safeUser }) => safeUser);
  res.json({ success: true, users });
});

router.put('/users/:id/role', authenticateToken, requireRole('ADMIN'), (req, res) => {
  const { role } = req.body;
  if (!['STUDENT', 'FACULTY', 'ADMIN'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role.' });
  }

  const updated = db.updateUserRole(req.params.id, role);
  res.json({ success: true, message: `User role updated to ${role}.`, user: updated });
});

router.delete('/users/:id', authenticateToken, requireRole('ADMIN'), (req, res) => {
  db.deleteUser(req.params.id);
  res.json({ success: true, message: 'User deleted successfully.' });
});

// Manage Topics
router.get('/topics', authenticateToken, requireRole('ADMIN'), (req, res) => {
  res.json({ success: true, topics: db.getAllTopics() });
});

router.post('/topics', authenticateToken, requireRole('ADMIN'), (req, res) => {
  const { name, subject, difficulty, prerequisites = [] } = req.body;
  if (!name || !subject) {
    return res.status(400).json({ success: false, message: 'Topic name and subject required.' });
  }

  const newTopic = {
    id: `top-${Date.now()}`,
    name,
    subject,
    difficulty: difficulty || 'Intermediate',
    prerequisites: Array.isArray(prerequisites) ? prerequisites : []
  };

  db.data.topics.push(newTopic);
  db.save();
  res.status(201).json({ success: true, topic: newTopic, message: 'Topic created.' });
});

// Manage Assessments
router.get('/assessments', authenticateToken, requireRole('ADMIN'), (req, res) => {
  res.json({ success: true, assessments: db.getAllAssessments() });
});

router.post('/assessments', authenticateToken, requireRole('ADMIN'), (req, res) => {
  const { title, subject, topic, difficulty, questions = [] } = req.body;
  if (!title || !subject) {
    return res.status(400).json({ success: false, message: 'Title and subject required.' });
  }

  const newAsm = {
    id: `asm-${Date.now()}`,
    title,
    subject,
    topic: topic || 'Core Fundamentals',
    difficulty: difficulty || 'Intermediate',
    createdAt: new Date().toISOString(),
    questions: questions.length > 0 ? questions : [
      {
        id: `q-${Date.now()}-1`,
        question: 'Sample diagnostic question for ' + title,
        options: ['Option A', 'Option B (Correct)', 'Option C', 'Option D'],
        correctIndex: 1,
        explanation: 'Option B is the correct choice.'
      }
    ]
  };

  db.data.assessments.push(newAsm);
  db.save();
  res.status(201).json({ success: true, assessment: newAsm, message: 'Assessment created.' });
});

export default router;
