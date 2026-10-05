// server/routes/studentRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { calculateGrowthScore } from '../engine/growthModel.js';
import { classifyGrowthFingerprint } from '../engine/fingerprintClassifier.js';
import { evaluatePrerequisites } from '../engine/knowledgeGraph.js';
import { generateLateBloomerRoadmap, generateTopPerformerRoadmap } from '../engine/recommendationEngine.js';
import { analyzeMistakes } from '../engine/mistakeAnalyzer.js';
import { explainScoreChange } from '../engine/scoreExplainer.js';

const router = express.Router();

// Get full student dashboard data
router.get('/dashboard', authenticateToken, (req, res) => {
  const studentId = req.user.id;
  const targetNotStudyTopic = req.query.notStudyTopic || 'Advanced AI';

  const user = db.findUserById(studentId);
  const profile = db.getStudentProfile(studentId) || {};
  const attempts = db.getStudentAttempts(studentId);
  const goals = db.getStudentGoals(studentId);
  const achievements = db.getStudentAchievements(studentId);
  const mistakes = db.getStudentMistakes(studentId);

  // Derive topic masteries from attempts
  const allTopics = db.getAllTopics();
  const topicsMap = {};

  // Default base topic masteries
  allTopics.forEach(t => {
    topicsMap[t.name] = {
      id: t.id,
      name: t.name,
      subject: t.subject,
      mastery: t.name === 'Variables' ? 88 : t.name === 'Loops' ? 72 : t.name === 'Functions' ? 48 : t.name === 'Arrays' ? 52 : t.name === 'Strings' ? 64 : 50,
      attempts: 5,
      correct: 3,
      wrong: 2,
      priority: t.name === 'Functions' || t.name === 'Arrays' ? '🔴 High Priority' : t.name === 'Variables' ? '🟢 Strong' : '🟡 Medium Priority',
      recommendedAction: `Solve 5 practice problems on ${t.name}`
    };
  });

  // Overlay attempts if available
  attempts.forEach(att => {
    if (att.topicScores) {
      Object.keys(att.topicScores).forEach(topName => {
        if (topicsMap[topName]) {
          topicsMap[topName].mastery = att.topicScores[topName];
          topicsMap[topName].score = att.topicScores[topName];
          if (att.topicScores[topName] >= 75) topicsMap[topName].priority = '🟢 Strong';
          else if (att.topicScores[topName] >= 60) topicsMap[topName].priority = '🟡 Medium Priority';
          else topicsMap[topName].priority = '🔴 High Priority';
        }
      });
    }
  });

  const topicsList = Object.values(topicsMap);

  // Format tests history
  const testsHistory = attempts.map((att, idx) => ({
    testName: `Assessment ${idx + 1}`,
    score: att.score,
    date: att.timestamp.split('T')[0]
  }));

  if (testsHistory.length === 0) {
    testsHistory.push({ testName: 'Baseline Diagnostic', score: profile.currentScore || 50, date: new Date().toISOString().split('T')[0] });
  }

  // Model student object for mathematical engine
  const studentModel = {
    id: user.id,
    name: user.name,
    currentScore: profile.currentScore || 75,
    streakDays: profile.streakDays || 5,
    tests: testsHistory,
    topics: topicsList,
    mistakes: mistakes.length > 0 ? mistakes : [
      {
        id: 'mst-1',
        topic: 'Functions',
        errorPattern: 'Repeated mistake: Confusing pass-by-value with pass-by-reference in C.',
        frequency: 6,
        rootCause: 'Assuming modifying a local parameter mutates the original variable in caller.',
        sampleSnippet: 'void swap(int a, int b) { int t = a; a = b; b = t; }',
        recommendedPractice: 'Practice 5 parameter-passing problems before moving forward.'
      }
    ],
    challengeHandling: 72,
    practiceActivityHours: profile.learningHours || 14
  };

  // Run AI/ML Mathematical Engine
  const growth = calculateGrowthScore(studentModel);
  const fingerprint = classifyGrowthFingerprint(studentModel);
  const lateBloomerRoadmap = generateLateBloomerRoadmap(studentModel);
  const topPerformerRoadmap = generateTopPerformerRoadmap(studentModel);
  const notToStudy = evaluatePrerequisites(topicsList, targetNotStudyTopic);
  const mistakeAnalysis = analyzeMistakes(studentModel);
  const scoreExplanation = explainScoreChange(studentModel);

  // Today's Mission Generator
  const isTopper = studentModel.currentScore >= 88;
  const primaryWeak = topicsList.find(t => t.priority.includes('High'))?.name || 'Functions';

  const dailyMission = isTopper ? {
    id: `mis-${Date.now()}`,
    title: 'Advanced Graph Optimization & Dijkstra Heuristics',
    description: 'Solve one challenging dynamic graph problem and benchmark cache-locality performance.',
    estimatedTime: '45 mins',
    targetScore: '95%',
    xpReward: 300,
    topic: 'Advanced Graph Algorithms',
    completed: false
  } : {
    id: `mis-${Date.now()}`,
    title: `Master Parameter Passing in ${primaryWeak}`,
    description: `Complete 3 focused practice questions on ${primaryWeak} and review prerequisite concepts.`,
    estimatedTime: '20 mins',
    targetScore: '80%',
    xpReward: 150,
    topic: primaryWeak,
    completed: false
  };

  res.json({
    success: true,
    student: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      department: profile.department || 'Computer Science & Engineering',
      semester: profile.semester || 'Semester 4',
      year: profile.year || 'Year 2',
      learningGoals: profile.goals || 'Master Data Structures and secure Tech Internship',
      currentScore: studentModel.currentScore,
      growthScore: growth.growthScore,
      momentumPercentage: growth.momentumPercentage,
      growthFactors: growth.factors,
      streakDays: profile.streakDays || 7,
      learningHours: profile.learningHours || 24.5,
      totalXP: profile.totalXP || 2450,
      currentLevel: profile.totalXP >= 5000 ? '🚀 Advanced' : profile.totalXP >= 3500 ? '🔥 Consistent' : '💪 Improving',
      fingerprint,
      dailyMission,
      lateBloomerRoadmap,
      topPerformerRoadmap,
      notToStudy,
      mistakeAnalysis,
      scoreExplanation,
      topics: topicsList,
      tests: testsHistory,
      goals,
      badges: achievements.length > 0 ? achievements : [
        { id: 'bdg-1', title: '7-Day Streak', icon: 'Flame', description: 'Maintained 7 consecutive active study days', unlocked: true },
        { id: 'bdg-2', title: 'Growth Rocket', icon: 'TrendingUp', description: 'Improved overall score by +25%', unlocked: true }
      ]
    }
  });
});

// Goals Management
router.get('/goals', authenticateToken, (req, res) => {
  const goals = db.getStudentGoals(req.user.id);
  res.json({ success: true, goals });
});

router.post('/goals', authenticateToken, (req, res) => {
  const { description, target, duePeriod } = req.body;
  if (!description) return res.status(400).json({ success: false, message: 'Description required.' });

  const newGoal = db.createGoal({
    id: `gol-${Date.now()}`,
    studentId: req.user.id,
    description,
    target: target || 'Complete topic mastery',
    status: 'In Progress',
    progress: 15,
    duePeriod: duePeriod || '30 Days',
    createdAt: new Date().toISOString()
  });

  res.status(201).json({ success: true, message: 'Goal created successfully.', goal: newGoal });
});

router.put('/goals/:id', authenticateToken, (req, res) => {
  const { status, progress } = req.body;
  const updated = db.updateGoal(req.params.id, { status, progress });
  res.json({ success: true, message: 'Goal updated.', goal: updated });
});

export default router;
