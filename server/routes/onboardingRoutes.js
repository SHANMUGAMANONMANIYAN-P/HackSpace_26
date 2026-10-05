// server/routes/onboardingRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get onboarding status
router.get('/status', authenticateToken, (req, res) => {
  const profile = db.getStudentProfile(req.user.id);
  res.json({
    success: true,
    isOnboarded: profile ? profile.isOnboarded !== false : true,
    profile
  });
});

// Complete Onboarding Steps & Diagnostic
router.post('/complete', authenticateToken, (req, res) => {
  const { department, year, semester, subjects = [], goals, diagnosticAnswers = [] } = req.body;
  
  // Grade diagnostic assessment
  const diagAssessment = db.getAssessmentById('asm-diag-init');
  const questions = diagAssessment?.questions || [];
  
  let correctCount = 0;
  diagnosticAnswers.forEach((ans, idx) => {
    if (questions[idx] && ans === questions[idx].correctIndex) {
      correctCount++;
    }
  });

  const diagnosticScore = Math.round((correctCount / Math.max(1, questions.length)) * 100);

  // Save diagnostic attempt
  db.createAttempt({
    id: `att-${Date.now()}`,
    studentId: req.user.id,
    assessmentId: 'asm-diag-init',
    score: diagnosticScore,
    topicScores: { 'Variables': 80, 'Loops': 60, 'Functions': 40 },
    timestamp: new Date().toISOString()
  });

  // Determine initial classification
  let classification = 'Developing Learner';
  if (diagnosticScore >= 80) classification = 'Top Performer – Beyond Syllabus';
  else if (diagnosticScore <= 60) classification = 'Late Bloomer – High Growth Potential';

  // Update profile
  const updatedProfile = db.updateStudentProfile(req.user.id, {
    department: department || 'Computer Science & Engineering',
    year: year || 'Year 1',
    semester: semester || 'Semester 1',
    interests: subjects,
    goals: goals || 'Master Core Computer Science Fundamentals',
    isOnboarded: true,
    currentScore: Math.max(45, diagnosticScore),
    totalXP: 250
  });

  // Upsert initial fingerprint
  const fingerprint = db.upsertGrowthFingerprint({
    studentId: req.user.id,
    performance: diagnosticScore,
    improvementTrend: 15,
    consistency: 50,
    mastery: Math.max(40, diagnosticScore),
    growthScore: Math.round(diagnosticScore * 0.8 + 20),
    classification,
    radarMetrics: [
      { subject: 'Current Performance', value: diagnosticScore, fullMark: 100 },
      { subject: 'Improvement Rate', value: 75, fullMark: 100 },
      { subject: 'Consistency', value: 60, fullMark: 100 },
      { subject: 'Mistake Control', value: 50, fullMark: 100 },
      { subject: 'Topic Mastery', value: diagnosticScore, fullMark: 100 },
      { subject: 'Challenge Handling', value: 60, fullMark: 100 },
    ]
  });

  // Create initial goal
  db.createGoal({
    id: `gol-${Date.now()}`,
    studentId: req.user.id,
    description: goals || 'Master Core Computer Science Fundamentals',
    target: 'Achieve ≥75% in Core CS Modules',
    status: 'In Progress',
    progress: diagnosticScore,
    duePeriod: '30 Days',
    createdAt: new Date().toISOString()
  });

  // Create welcome achievement
  db.createAchievement({
    id: `ach-${Date.now()}`,
    studentId: req.user.id,
    badge: 'Growth DNA Initialized',
    icon: 'Sparkles',
    description: 'Completed onboarding & diagnostic baseline',
    XP: 250,
    timestamp: new Date().toISOString()
  });

  res.json({
    success: true,
    message: 'Onboarding completed successfully! Your Growth DNA has been synthesized.',
    profile: updatedProfile,
    fingerprint
  });
});

export default router;
