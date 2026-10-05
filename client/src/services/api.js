// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT Token to every outgoing request if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('growthmind_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const api = {
  // Authentication
  register: async (userData) => {
    const res = await apiClient.post('/auth/register', userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },

  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  updateProfile: async (profileData) => {
    const res = await apiClient.put('/auth/profile', profileData);
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  },

  // Onboarding
  getOnboardingStatus: async () => {
    const res = await apiClient.get('/onboarding/status');
    return res.data;
  },

  completeOnboarding: async (onboardingData) => {
    const res = await apiClient.post('/onboarding/complete', onboardingData);
    return res.data;
  },

  // Student Dashboard & Metrics (Fetches authenticated student data)
  getStudentDashboard: async (notStudyTopic = 'Advanced AI') => {
    const res = await apiClient.get(`/student/dashboard?notStudyTopic=${encodeURIComponent(notStudyTopic)}`);
    return res.data;
  },

  getStudentById: async (studentId, notStudyTopic = 'Advanced AI') => {
    const res = await apiClient.get(`/student/dashboard?notStudyTopic=${encodeURIComponent(notStudyTopic)}`);
    return res.data;
  },

  getGoals: async () => {
    const res = await apiClient.get('/student/goals');
    return res.data;
  },

  createGoal: async (goalData) => {
    const res = await apiClient.post('/student/goals', goalData);
    return res.data;
  },

  updateGoal: async (id, goalData) => {
    const res = await apiClient.put(`/student/goals/${id}`, goalData);
    return res.data;
  },

  // Assessments & Quizzes
  getAssessments: async () => {
    const res = await apiClient.get('/assessments');
    return res.data;
  },

  getAssessmentById: async (id) => {
    const res = await apiClient.get(`/assessments/${id}`);
    return res.data;
  },

  submitAssessment: async (assessmentId, answers) => {
    const res = await apiClient.post(`/assessments/${assessmentId}/submit`, { answers });
    return res.data;
  },

  // Legacy/Topic Quiz shorthand
  getQuizQuestions: async (topic) => {
    const res = await apiClient.get(`/quiz/${encodeURIComponent(topic)}`);
    return res.data;
  },

  submitQuiz: async (studentId, topic, answers) => {
    const res = await apiClient.post(`/students/${studentId}/quiz/submit`, { topic, answers });
    return res.data;
  },

  // AI Mentor Chat
  sendMentorMessage: async (studentId, message) => {
    const res = await apiClient.post('/mentor/chat', { studentId, message });
    return res.data;
  },

  // Faculty Command Center
  getFacultyDashboard: async () => {
    const res = await apiClient.get('/faculty/dashboard');
    return res.data;
  },

  getFacultyOverview: async () => {
    const res = await apiClient.get('/faculty/dashboard');
    return res.data;
  },

  createFacultyAssessment: async (assessmentData) => {
    const res = await apiClient.post('/faculty/assessments', assessmentData);
    return res.data;
  },

  sendFacultyIntervention: async (data) => {
    const res = await apiClient.post('/faculty/intervene', data);
    return res.data;
  },

  // Admin Dashboard
  getAdminOverview: async () => {
    const res = await apiClient.get('/admin/overview');
    return res.data;
  },

  getAdminUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },

  updateUserRole: async (id, role) => {
    const res = await apiClient.put(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await apiClient.delete(`/admin/users/${id}`);
    return res.data;
  },

  // Demo Switcher
  getDemoPersonas: async () => {
    const res = await apiClient.get('/demo/personas');
    return res.data;
  },

  switchDemoPersona: async (personaId) => {
    const res = await apiClient.post('/demo/switch', { personaId });
    return res.data;
  },

  resetDemoDatabase: async () => {
    const res = await apiClient.post('/demo/reset');
    return res.data;
  },

  resetDemoData: async () => {
    const res = await apiClient.post('/demo/reset');
    return res.data;
  },
};

export default api;
