// client/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGrowth } from '../context/GrowthContext';
import { api } from '../services/api';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Target, 
  Award, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  BookOpen, 
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser, role } = useAuth();
  const { studentData, refreshData } = useGrowth();

  const [formData, setFormData] = useState({
    department: '',
    year: '',
    semester: '',
    goals: '',
    interests: '',
    avatar: ''
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (studentData) {
      setFormData({
        department: studentData.department || 'Computer Science & Engineering',
        year: studentData.year || 'Year 2',
        semester: studentData.semester || 'Semester 4',
        goals: studentData.learningGoals || 'Master Data Structures & Algorithms',
        interests: Array.isArray(studentData.interests) ? studentData.interests.join(', ') : 'C Programming, Data Structures, Machine Learning',
        avatar: user?.avatar || ''
      });
    }
  }, [studentData, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const interestsArray = formData.interests.split(',').map(s => s.trim()).filter(Boolean);
      const res = await api.updateProfile({
        department: formData.department,
        year: formData.year,
        semester: formData.semester,
        goals: formData.goals,
        interests: interestsArray,
        avatar: formData.avatar
      });

      if (res && res.success) {
        setSuccessMessage('Profile details updated successfully!');
        if (refreshData) await refreshData();
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
            alt={user?.name}
            className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-emerald-400/40 object-cover shadow-lg"
          />
          
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                {user?.name || studentData?.name}
              </h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {role}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email}</span>
            </p>

            {role === 'STUDENT' && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-slate-800/80 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>{studentData?.streakDays || 7} Day Streak</span>
                </span>
                <span className="flex items-center gap-1.5 text-indigo-300 font-bold bg-slate-800/80 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 fill-current text-indigo-400" />
                  <span>{studentData?.totalXP || 2450} Total XP</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-slate-800/80 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span>{studentData?.fingerprint?.title || 'Active Learner'}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Form & Settings */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Academic Profile & Preferences</h2>
              <p className="text-xs text-slate-500">Update your degree details, target goals, and topic focus.</p>
            </div>
          </div>

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Year of Study
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Primary Learning Goal
              </label>
              <input
                type="text"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="e.g. Master Data Structures and crack product company interviews"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Technical Interests (comma-separated)
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g. C Programming, Algorithms, Systems Architecture"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Badges & Achievements Section */}
        {role === 'STUDENT' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Earned Growth Badges & Milestones</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-center space-y-1">
                <span className="text-2xl">🔥</span>
                <p className="text-xs font-bold text-slate-900">7-Day Streak</p>
                <p className="text-[10px] text-slate-500 font-medium">Consistent daily learning</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-center space-y-1">
                <span className="text-2xl">🌱</span>
                <p className="text-xs font-bold text-slate-900">Growth Rocket</p>
                <p className="text-[10px] text-slate-500 font-medium">+25% score velocity</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 text-center space-y-1">
                <span className="text-2xl">🎯</span>
                <p className="text-xs font-bold text-slate-900">Basics Master</p>
                <p className="text-[10px] text-slate-500 font-medium">100% on C Fundamentals</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 text-center space-y-1">
                <span className="text-2xl">👑</span>
                <p className="text-xs font-bold text-slate-900">Prerequisite Ace</p>
                <p className="text-[10px] text-slate-500 font-medium">Unlocked Advanced Tracks</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
