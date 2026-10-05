// server/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { generateToken, authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new student/faculty
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword, department = 'Computer Science & Engineering', year = 'Year 1', semester = 'Semester 1', role = 'STUDENT' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  if (confirmPassword && password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  const existingUser = db.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const newUserId = `usr-${Date.now()}`;

  const newUser = {
    id: newUserId,
    name,
    email,
    passwordHash,
    role: role.toUpperCase() === 'FACULTY' ? 'FACULTY' : 'STUDENT',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString()
  };

  db.createUser(newUser);

  // If student, create student profile & initial empty growth fingerprint
  if (newUser.role === 'STUDENT') {
    db.createStudentProfile({
      studentId: newUserId,
      department,
      year,
      semester,
      academicDetails: `${department} ${year}/${semester}`,
      interests: [],
      goals: 'Strengthen core CS fundamentals',
      isOnboarded: false, // Triggers Onboarding wizard!
      currentScore: 50,
      streakDays: 1,
      learningHours: 0,
      totalXP: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    db.upsertGrowthFingerprint({
      studentId: newUserId,
      performance: 50,
      improvementTrend: 0,
      consistency: 20,
      mastery: 40,
      growthScore: 50,
      classification: 'Developing Learner',
      radarMetrics: [
        { subject: 'Current Performance', value: 50, fullMark: 100 },
        { subject: 'Improvement Rate', value: 20, fullMark: 100 },
        { subject: 'Consistency', value: 20, fullMark: 100 },
        { subject: 'Mistake Control', value: 50, fullMark: 100 },
        { subject: 'Topic Mastery', value: 40, fullMark: 100 },
        { subject: 'Challenge Handling', value: 40, fullMark: 100 },
      ]
    });
  }

  const token = generateToken(newUser);

  res.status(201).json({
    success: true,
    message: 'Account registered successfully.',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      isOnboarded: false
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  const user = db.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
  }

  const token = generateToken(user);
  const profile = db.getStudentProfile(user.id);

  res.json({
    success: true,
    message: 'Login successful.',
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

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  const profile = db.getStudentProfile(req.user.id);
  const fingerprint = db.getGrowthFingerprint(req.user.id);

  res.json({
    success: true,
    user: {
      ...req.user,
      profile: profile || {},
      fingerprint: fingerprint || {},
      isOnboarded: profile ? profile.isOnboarded !== false : true
    }
  });
});

// Update profile
router.put('/profile', authenticateToken, (req, res) => {
  const { department, year, semester, goals, interests, avatar } = req.body;

  if (avatar) {
    db.updateUser(req.user.id, { avatar });
  }

  if (req.user.role === 'STUDENT') {
    const updated = db.updateStudentProfile(req.user.id, {
      department,
      year,
      semester,
      goals,
      interests: Array.isArray(interests) ? interests : []
    });
    return res.json({ success: true, message: 'Profile updated successfully.', profile: updated });
  }

  res.json({ success: true, message: 'Profile updated.' });
});

// Forgot password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = db.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'No account registered with this email address.' });
  }

  // Simulated secure password reset link
  res.json({
    success: true,
    message: 'Password reset link sent to your email. (For demo: use password123)'
  });
});

export default router;
