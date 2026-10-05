// server/routes/api.js
import express from 'express';
import { SAMPLE_STUDENTS, FACULTY_DATA } from '../data/sampleStudents.js';
import { QUIZ_BANK } from '../data/quizBank.js';
import { calculateGrowthScore } from '../engine/growthModel.js';
import { classifyGrowthFingerprint } from '../engine/fingerprintClassifier.js';
import { evaluatePrerequisites } from '../engine/knowledgeGraph.js';
import { generateLateBloomerRoadmap, generateTopPerformerRoadmap } from '../engine/recommendationEngine.js';
import { analyzeMistakes } from '../engine/mistakeAnalyzer.js';
import { explainScoreChange } from '../engine/scoreExplainer.js';

const router = express.Router();

// In-memory student state store initialized with samples
let studentsDb = JSON.parse(JSON.stringify(SAMPLE_STUDENTS));

/**
 * Helper to compute full enriched profile for a student
 */
function enrichStudentProfile(student, targetNotStudyTopic = 'Advanced AI') {
  const growth = calculateGrowthScore(student);
  const fingerprint = classifyGrowthFingerprint(student);
  const lateBloomerRoadmap = generateLateBloomerRoadmap(student);
  const topPerformerRoadmap = generateTopPerformerRoadmap(student);
  const notToStudy = evaluatePrerequisites(student.topics, targetNotStudyTopic);
  const mistakeAnalysis = analyzeMistakes(student);
  const scoreExplanation = explainScoreChange(student);

  return {
    ...student,
    growthScore: growth.growthScore,
    momentumPercentage: growth.momentumPercentage,
    growthFactors: growth.factors,
    fingerprint,
    lateBloomerRoadmap,
    topPerformerRoadmap,
    notToStudy,
    mistakeAnalysis,
    scoreExplanation
  };
}

// GET all students overview
router.get('/students', (req, res) => {
  const enrichedList = studentsDb.map(s => enrichStudentProfile(s));
  res.json({
    success: true,
    students: enrichedList
  });
});

// GET single student full profile
router.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const targetTopic = req.query.notStudyTopic || 'Advanced AI';
  const student = studentsDb.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student persona not found' });
  }

  const enriched = enrichStudentProfile(student, targetTopic);
  res.json({
    success: true,
    student: enriched
  });
});

// GET quiz questions for a topic
router.get('/quiz/:topic', (req, res) => {
  const { topic } = req.params;
  const questions = QUIZ_BANK[topic] || QUIZ_BANK['Functions'];
  res.json({
    success: true,
    topic,
    questions
  });
});

// POST submit quiz answers and dynamically recalculate growth
router.post('/students/:id/quiz/submit', (req, res) => {
  const { id } = req.params;
  const { topic = 'Functions', answers = [] } = req.body;
  
  const studentIndex = studentsDb.findIndex(s => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const student = studentsDb[studentIndex];
  const questionPool = QUIZ_BANK[topic] || QUIZ_BANK['Functions'];
  
  let correctCount = 0;
  let wrongCount = 0;
  const detailedResults = [];

  questionPool.forEach((q, idx) => {
    const userAns = answers.find(a => a.questionId === q.id) || { selectedIndex: -1 };
    const isCorrect = userAns.selectedIndex === q.correctIndex;
    if (isCorrect) correctCount++;
    else wrongCount++;

    detailedResults.push({
      questionId: q.id,
      question: q.question,
      userAnswerIndex: userAns.selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    });
  });

  const quizScorePercent = Math.round((correctCount / questionPool.length) * 100);

  // Dynamically update student's topic mastery
  let topicObj = student.topics.find(t => t.name.toLowerCase() === topic.toLowerCase());
  const prevMastery = topicObj ? topicObj.mastery : 50;
  const newMastery = Math.min(100, Math.round(prevMastery + (quizScorePercent >= 70 ? 18 : 6)));

  if (topicObj) {
    topicObj.mastery = newMastery;
    topicObj.score = newMastery;
    topicObj.attempts += questionPool.length;
    topicObj.correct += correctCount;
    topicObj.wrong += wrongCount;
    if (newMastery >= 75) {
      topicObj.priority = '🟢 Strong';
      topicObj.recommendedAction = 'Topic consolidated, move to next target';
    } else if (newMastery >= 60) {
      topicObj.priority = '🟡 Medium Priority';
      topicObj.recommendedAction = 'Practice 1 more intermediate quiz';
    } else {
      topicObj.priority = '🔴 High Priority';
    }
  }

  // If topic is Functions and improved, resolve the Functions mistake frequency
  if (topic.toLowerCase() === 'functions') {
    const mistake = student.mistakes.find(m => m.topic === 'Functions');
    if (mistake && mistake.frequency > 2) {
      mistake.frequency -= 3;
    }
  }

  // Update tests history
  const updatedTestScore = Math.min(100, Math.round(student.currentScore + (quizScorePercent >= 70 ? 4 : 1)));
  student.currentScore = updatedTestScore;
  student.tests.push({
    testName: `${topic} Dynamic Drill`,
    score: updatedTestScore,
    date: new Date().toISOString().split('T')[0]
  });

  // Update XP & Daily Mission
  const xpEarned = correctCount * 50 + 50;
  student.totalXP += xpEarned;
  student.assessmentsCompletedCount += 1;
  if (student.dailyMission && student.dailyMission.topic.toLowerCase() === topic.toLowerCase()) {
    student.dailyMission.completed = true;
  }

  // Enrich updated state
  const enriched = enrichStudentProfile(student);

  res.json({
    success: true,
    quizResult: {
      topic,
      scorePercent: quizScorePercent,
      correctCount,
      wrongCount,
      totalQuestions: questionPool.length,
      previousMastery: prevMastery,
      newMastery: newMastery,
      xpEarned,
      detailedResults
    },
    updatedStudent: enriched,
    dynamicPathMessage: quizScorePercent >= 70 
      ? `🎉 Great job! ${topic} mastery improved from ${prevMastery}% → ${newMastery}%. System has updated your learning roadmap.`
      : `Good effort! Practice completed. ${topic} mastery shifted from ${prevMastery}% → ${newMastery}%.`
  });
});

// POST AI Mentor Chat interaction
router.post('/mentor/chat', (req, res) => {
  const { studentId = 'student-tharun', message = '' } = req.body;
  const student = studentsDb.find(s => s.id === studentId) || studentsDb[0];
  const userMsgLower = (message || '').toLowerCase();

  let reply = '';
  let suggestedActions = [];

  if (student.id === 'student-tharun') {
    if (userMsgLower.includes('not study') || userMsgLower.includes('priority')) {
      reply = `⚠️ **Smart Learning Priority Alert**: You should **NOT** jump directly into **Advanced AI** right now. Your current prerequisite foundations in **Functions (${student.topics[0]?.mastery || 48}%)** and **Arrays (${student.topics[1]?.mastery || 52}%)** are still developing. Strengthening these core building blocks first will make AI and algorithms 10x easier later!`;
      suggestedActions = ['View Recommended Recovery Path', 'Start Functions Quiz', 'Explain Parameter Passing'];
    } else if (userMsgLower.includes('why') && (userMsgLower.includes('score') || userMsgLower.includes('change'))) {
      reply = `📈 **Why your score increased (+28% momentum)**: You've maintained a **${student.streakDays}-day streak**, eliminated variable mistakes (88% mastery), and your upward trajectory proves exceptional resilience. You are classified as a **Late Bloomer – High Growth Potential**!`;
      suggestedActions = ['View Growth Fingerprint', 'Practice Functions', 'Review Roadmap'];
    } else if (userMsgLower.includes('what should i study') || userMsgLower.includes('today') || userMsgLower.includes('mission')) {
      reply = `🎯 **Your Highest Priority Mission Today**: Focus on **Functions**. You are currently at **${student.topics[0]?.mastery || 48}% mastery** with repeated mistakes in parameter passing. Spend 20 minutes practicing the 3 parameter passing drill questions to unlock Step 3!`;
      suggestedActions = ['Start Functions Drill (3 Qs)', 'Open Mistake Analyzer', 'View Recovery Plan'];
    } else {
      reply = `Hello **${student.name}**! 👋 I am your Growth Mentor. Your learning trajectory shows **+28% Growth Momentum**. Let's tackle **Functions** today so you can unlock Step 3 in your Recovery Roadmap. How can I help you grow today?`;
      suggestedActions = ['What should I study today?', 'What should I NOT study now?', 'Why am I losing marks?'];
    }
  } else if (student.id === 'student-aadhya') {
    if (userMsgLower.includes('what should i study') || userMsgLower.includes('learn next') || userMsgLower.includes('next')) {
      reply = `🚀 **Beyond the Syllabus Recommendation**: You have consistently maintained **${student.currentScore}%+ accuracy** across all core modules. I recommend bypassing basic revision and tackling **Advanced Graph Algorithms (Dijkstra/Tarjan)** and building the **High-Throughput Route Optimization Project**!`;
      suggestedActions = ['Launch Route Optimization Project', 'Explore Research Paper', 'Register for Hackathon'];
    } else {
      reply = `Hello **${student.name}**! 👑 As an elite **Top Performer**, your roadmap is configured for **Beyond the Syllabus** exploration. Ready to tackle advanced systems architecture and competitive programming?`;
      suggestedActions = ['Show Beyond Syllabus Tracks', 'Research Opportunities', 'Hackathon Challenges'];
    }
  } else {
    reply = `Hello **${student.name}**! 👋 Your growth journey is currently at **${student.currentScore}%** with **${student.currentLevel}**. Let's focus on steady consistency and mastering your next topic milestone!`;
    suggestedActions = ['Check Daily Mission', 'Review Weak Topics', 'View Progress Chart'];
  }

  res.json({
    success: true,
    reply,
    suggestedActions,
    timestamp: new Date().toLocaleTimeString()
  });
});

// GET faculty cohort overview & growth comparison
router.get('/faculty/overview', (req, res) => {
  const studentProfiles = studentsDb.map(s => enrichStudentProfile(s));
  
  // Sort by growth momentum for the innovative growth comparison view
  const growthComparison = studentProfiles.map(s => ({
    id: s.id,
    name: s.name,
    avatar: s.avatar,
    department: s.department,
    currentScore: s.currentScore,
    growthMomentum: s.momentumPercentage,
    classification: s.fingerprint.title,
    badgeColor: s.fingerprint.badgeColor,
    highestPriorityTopic: s.topics.find(t => t.mastery < 60)?.name || 'Consolidation',
    streak: s.streakDays,
    highlight: s.id === 'student-tharun' ? '⭐ Highest Growth Momentum (+28%)' : (s.id === 'student-aadhya' ? '👑 Top Absolute Score (92%)' : 'Steady Progress')
  })).sort((a, b) => b.growthMomentum - a.growthMomentum);

  res.json({
    success: true,
    faculty: FACULTY_DATA,
    growthComparison,
    students: studentProfiles
  });
});

// POST reset demo dataset
router.post('/demo/reset', (req, res) => {
  studentsDb = JSON.parse(JSON.stringify(SAMPLE_STUDENTS));
  res.json({ success: true, message: 'Sample student database successfully reset to defaults.' });
});

export default router;
