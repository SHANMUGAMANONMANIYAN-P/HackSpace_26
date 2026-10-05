// server/routes/demoRoutes.js
import express from 'express';
import { db } from '../db/database.js';
import { generateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

const DEMO_PERSONAS = [
  { id: 'usr-tharun', name: 'Tharun', email: 'tharun.growth@mind.edu', role: 'STUDENT', classification: 'Late Bloomer – High Growth Potential (+28%)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', score: '75%', momentum: '+28%', badgeColor: 'emerald' },
  { id: 'usr-aadhya', name: 'Aadhya', email: 'aadhya.top@mind.edu', role: 'STUDENT', classification: 'Top Performer – Beyond Syllabus', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', score: '92%', momentum: '+4%', badgeColor: 'purple' },
  { id: 'usr-rohan', name: 'Rohan', email: 'rohan.dev@mind.edu', role: 'STUDENT', classification: 'Developing Learner – Steady Growth', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', score: '61%', momentum: '+12%', badgeColor: 'blue' },
  { id: 'usr-priya', name: 'Priya', email: 'priya.cons@mind.edu', role: 'STUDENT', classification: 'Consistent Learner – High Discipline', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', score: '78%', momentum: '+10%', badgeColor: 'cyan' },
  { id: 'usr-sharma', name: 'Prof. Sharma', email: 'sharma.faculty@mind.edu', role: 'FACULTY', classification: 'Faculty / Dept Head', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', score: 'Cohort: 64', momentum: 'Avg +13.8%', badgeColor: 'indigo' },
  { id: 'usr-admin', name: 'System Admin', email: 'admin@growthmind.edu', role: 'ADMIN', classification: 'Platform Admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', score: 'Control', momentum: 'System', badgeColor: 'slate' },
];

// Get list of demo personas
router.get('/personas', (req, res) => {
  res.json({ success: true, personas: DEMO_PERSONAS });
});

// Switch to demo persona with real JWT token
router.post('/switch', (req, res) => {
  const { personaId = 'usr-tharun' } = req.body;
  const user = db.findUserById(personaId) || db.findUserById('usr-tharun');

  if (!user) {
    return res.status(404).json({ success: false, message: 'Demo persona not found' });
  }

  const token = generateToken(user);
  const profile = db.getStudentProfile(user.id);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isOnboarded: profile ? profile.isOnboarded !== false : true
    }
  });
});

// Reset demo database to initial seed
router.post('/reset', (req, res) => {
  db.seedInitialData();
  res.json({ success: true, message: 'Demo database has been reset to baseline defaults.' });
});

export default router;
