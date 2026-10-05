// server/routes/mentorRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { generateMentorAdvice } from '../services/genaiService.js';

const router = express.Router();

// AI Mentor Chat interaction
router.post('/chat', authenticateToken, async (req, res) => {
  const { message = '' } = req.body;
  const studentId = req.user.id;

  const user = db.findUserById(studentId) || req.user;
  const profile = db.getStudentProfile(studentId) || {};
  const fingerprint = db.getGrowthFingerprint(studentId) || {};
  const attempts = db.getStudentAttempts(studentId);

  // Weak topics
  const weakTopics = [
    { name: 'Functions', mastery: 48 },
    { name: 'Arrays', mastery: 52 },
    { name: 'Strings', mastery: 64 }
  ];

  const advice = await generateMentorAdvice({
    student: user,
    studentProfile: profile,
    fingerprint,
    weakTopics,
    recentAttempts: attempts,
    userMessage: message
  });

  res.json({
    success: true,
    reply: advice.reply,
    source: advice.source,
    suggestedActions: advice.suggestedActions,
    timestamp: new Date().toLocaleTimeString()
  });
});

export default router;
