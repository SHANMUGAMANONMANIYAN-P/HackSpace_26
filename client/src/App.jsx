// client/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DemoSwitcher } from './components/DemoSwitcher';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InteractiveQuizModal } from './components/InteractiveQuizModal';
import { NotificationToast } from './components/NotificationToast';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import { OnboardingPage } from './pages/OnboardingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import GrowthPage from './pages/GrowthPage';
import LearningPathPage from './pages/LearningPathPage';
import AssessmentPage from './pages/AssessmentPage';
import GoalsPage from './pages/GoalsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import { MentorPage } from './pages/MentorPage';
import { FacultyDashboard } from './pages/FacultyDashboard';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-200">
      {/* 1-Click Demo Switcher Top Bar for Hackathon Presentation */}
      <DemoSwitcher />

      {/* Main Navbar */}
      <Navbar />

      {/* Main View Routes */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth" element={<Navigate to="/login" replace />} />

          {/* Onboarding Flow for New Students */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Student Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/growth"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <GrowthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-path"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <LearningPathPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <AssessmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessments"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <AssessmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <GoalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunities"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <OpportunitiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                <MentorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Faculty Protected Routes */}
          <Route
            path="/faculty"
            element={
              <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallbacks */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Interactive Elements */}
      <InteractiveQuizModal />
      <NotificationToast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
