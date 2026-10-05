// server/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Database
import { db } from './db/database.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import onboardingRoutes from './routes/onboardingRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import demoRoutes from './routes/demoRoutes.js';
import legacyApiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/demo', demoRoutes);

// General/Legacy API compatibility routes
app.use('/api', legacyApiRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    platform: 'GrowthMind – AI-Powered Student Growth & Learning Mentor',
    tagline: 'Not Just a Score. A Growth Journey.',
    status: 'ONLINE',
    database: 'Persistent Relational JSON/Disk',
    unifiedUrl: `http://localhost:${process.env.PORT || 5000}`,
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend assets from client/dist
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// SPA Catch-all Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`🌱 GrowthMind Complete Production Application is LIVE!`);
  console.log(`🎯 Server listening on 0.0.0.0:${PORT}`);
  console.log(`🚀 USP: Others personalize what you learn. GrowthMind personalizes how you grow.`);
  console.log(`📦 Database: Persistent Disk Storage (${db.data.users.length} Users Seeded)`);
  console.log('====================================================');
});

