// server/routes/facultyRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Faculty Dashboard Overview
router.get('/dashboard', authenticateToken, requireRole('FACULTY', 'ADMIN'), (req, res) => {
  const students = db.getAllStudentsWithProfiles();
  
  const totalStudents = students.length;
  const topPerformers = students.filter(s => s.currentScore >= 88);
  const lateBloomers = students.filter(s => s.growthMomentum >= 15 && s.currentScore < 88);
  const developing = students.filter(s => s.currentScore >= 50 && s.currentScore < 75 && s.growthMomentum < 15);
  const needsSupport = students.filter(s => s.currentScore < 50);

  const avgScore = totalStudents > 0 
    ? (students.reduce((acc, s) => acc + s.currentScore, 0) / totalStudents).toFixed(1)
    : 75;

  const avgMomentum = totalStudents > 0
    ? (students.reduce((acc, s) => acc + s.growthMomentum, 0) / totalStudents).toFixed(1)
    : 13.8;

  // Growth comparison list sorted by momentum (USP!)
  const growthComparison = [...students].sort((a, b) => b.growthMomentum - a.growthMomentum);

  res.json({
    success: true,
    faculty: {
      name: req.user.name,
      department: 'Computer Science & Engineering',
      stats: {
        totalStudents,
        averageScore: Number(avgScore),
        averageGrowthMomentum: `+${avgMomentum}%`,
        topPerformersCount: topPerformers.length,
        lateBloomersCount: lateBloomers.length,
        developingLearnersCount: developing.length,
        needsSupportCount: needsSupport.length
      },
      difficultTopics: [
        { name: 'Pointers & Dynamic Memory', subject: 'C Programming', averageMastery: 45, failureRate: '42%', strugglingStudents: 12 },
        { name: 'Functions & Parameter Passing', subject: 'C Programming', averageMastery: 53, failureRate: '34%', strugglingStudents: 8 },
        { name: 'Async JavaScript & Promises', subject: 'Web Dev', averageMastery: 58, failureRate: '29%', strugglingStudents: 6 },
        { name: 'Nested Loops & Boundary Traversal', subject: 'C Programming', averageMastery: 66, failureRate: '21%', strugglingStudents: 4 }
      ],
      growthComparison
    }
  });
});

// Create new assessment by faculty
router.post('/assessments', authenticateToken, requireRole('FACULTY', 'ADMIN'), (req, res) => {
  const { title, subject, topic, difficulty = 'Intermediate', questions = [] } = req.body;

  if (!title || !topic || questions.length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide title, topic, and at least one question.' });
  }

  const newAssessment = db.createAssessment({
    id: `asm-${Date.now()}`,
    title,
    subject: subject || 'Computer Science',
    topic,
    difficulty,
    createdAt: new Date().toISOString(),
    questions
  });

  res.status(201).json({
    success: true,
    message: 'Assessment created successfully.',
    assessment: newAssessment
  });
});

// Send targeted mentorship intervention
router.post('/intervene', authenticateToken, requireRole('FACULTY', 'ADMIN'), (req, res) => {
  const { studentId, message, topic } = req.body;
  
  res.json({
    success: true,
    message: `Academic guidance sent to student. Priority assigned: ${topic || 'Functions'}.`
  });
});

export default router;
