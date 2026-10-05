// server/routes/assessmentRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// List all available assessments
router.get('/', authenticateToken, (req, res) => {
  const assessments = db.getAllAssessments();
  res.json({
    success: true,
    assessments: assessments.map(({ questions, ...meta }) => ({
      ...meta,
      questionCount: questions.length
    }))
  });
});

// Get single assessment with questions
router.get('/:id', authenticateToken, (req, res) => {
  const assessment = db.getAssessmentById(req.params.id);
  if (!assessment) {
    return res.status(404).json({ success: false, message: 'Assessment not found' });
  }

  res.json({
    success: true,
    assessment: {
      id: assessment.id,
      title: assessment.title,
      subject: assessment.subject,
      topic: assessment.topic,
      difficulty: assessment.difficulty,
      questions: assessment.questions.map(({ correctIndex, ...safeQ }) => safeQ) // hide correctIndex before submit
    }
  });
});

// Submit assessment attempt & dynamically recalculate growth
router.post('/:id/submit', authenticateToken, (req, res) => {
  const assessment = db.getAssessmentById(req.params.id) || db.getAllAssessments()[0];
  const { answers = [] } = req.body;
  const studentId = req.user.id;

  const questions = assessment.questions;
  let correctCount = 0;
  let wrongCount = 0;
  const detailedResults = [];

  questions.forEach((q) => {
    const userAns = answers.find(a => a.questionId === q.id) || { selectedIndex: -1 };
    const isCorrect = userAns.selectedIndex === q.correctIndex;
    if (isCorrect) correctCount++;
    else wrongCount++;

    detailedResults.push({
      questionId: q.id,
      question: q.question,
      codeSnippet: q.codeSnippet,
      userAnswerIndex: userAns.selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    });
  });

  const quizScorePercent = Math.round((correctCount / Math.max(1, questions.length)) * 100);

  // 1. Record Attempt in database
  const topicScores = {
    [assessment.topic]: quizScorePercent
  };

  const newAttempt = db.createAttempt({
    id: `att-${Date.now()}`,
    studentId,
    assessmentId: assessment.id,
    score: quizScorePercent,
    topicScores,
    timestamp: new Date().toISOString()
  });

  // 2. Update Student Profile in database
  const profile = db.getStudentProfile(studentId) || {};
  const prevScore = profile.currentScore || 65;
  const newOverallScore = Math.min(100, Math.round(prevScore + (quizScorePercent >= 70 ? 4 : 1)));
  const xpEarned = correctCount * 50 + 50;

  db.updateStudentProfile(studentId, {
    currentScore: newOverallScore,
    totalXP: (profile.totalXP || 1000) + xpEarned,
    learningHours: (profile.learningHours || 10) + 0.5
  });

  // 3. Update Mistake log if solved correctly
  if (assessment.topic === 'Functions' && quizScorePercent >= 70) {
    const mistakes = db.getStudentMistakes(studentId);
    const funcMistake = mistakes.find(m => m.topic === 'Functions');
    if (funcMistake && funcMistake.frequency > 1) {
      db.upsertMistake({ ...funcMistake, frequency: funcMistake.frequency - 2 });
    }
  }

  // 4. Update Growth Fingerprint in database
  const prevFingerprint = db.getGrowthFingerprint(studentId) || {};
  const newImprovement = Math.min(100, (prevFingerprint.improvementTrend || 15) + (quizScorePercent >= 70 ? 5 : 1));
  const newGrowthScore = Math.min(100, Math.round((newOverallScore * 0.4) + (newImprovement * 0.4) + 20));

  let classification = prevFingerprint.classification || 'Late Bloomer – High Growth Potential';
  if (newOverallScore >= 88) classification = 'Top Performer – Beyond Syllabus';
  else if (newImprovement >= 15) classification = 'Late Bloomer – High Growth Potential';

  db.upsertGrowthFingerprint({
    studentId,
    performance: newOverallScore,
    improvementTrend: newImprovement,
    consistency: Math.min(100, (prevFingerprint.consistency || 50) + 5),
    mastery: Math.min(100, (prevFingerprint.mastery || 50) + 8),
    growthScore: newGrowthScore,
    classification,
    radarMetrics: [
      { subject: 'Current Performance', value: newOverallScore, fullMark: 100 },
      { subject: 'Improvement Rate', value: Math.min(100, newImprovement * 3), fullMark: 100 },
      { subject: 'Consistency', value: 75, fullMark: 100 },
      { subject: 'Mistake Control', value: 65, fullMark: 100 },
      { subject: 'Topic Mastery', value: Math.min(100, (prevFingerprint.mastery || 50) + 8), fullMark: 100 },
      { subject: 'Challenge Handling', value: 75, fullMark: 100 },
    ]
  });

  res.json({
    success: true,
    quizResult: {
      assessmentTitle: assessment.title,
      topic: assessment.topic,
      scorePercent: quizScorePercent,
      correctCount,
      wrongCount,
      totalQuestions: questions.length,
      xpEarned,
      newOverallScore,
      detailedResults
    },
    dynamicPathMessage: quizScorePercent >= 70
      ? `🎉 Great job! ${assessment.topic} mastery improved. The system has dynamically updated your Learning Path and prioritized the next target.`
      : `Drill completed! ${assessment.topic} recorded. Review the explanations below and attempt another practice session.`
  });
});

export default router;
