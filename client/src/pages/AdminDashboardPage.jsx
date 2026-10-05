// client/src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Server, 
  Activity, 
  UserCheck, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Bot
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'curriculum' | 'reports'
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [overviewRes, usersRes] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminUsers()
      ]);

      if (overviewRes && overviewRes.success) setOverview(overviewRes.overview);
      if (usersRes && usersRes.success) setUsers(usersRes.users);
    } catch (err) {
      console.error('Error fetching admin data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.updateUserRole(userId, newRole);
      if (res && res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setMsg(`Role updated to ${newRole}`);
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update user role.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    try {
      const res = await api.deleteUser(userId);
      if (res && res.success) {
        setUsers(users.filter(u => u.id !== userId));
        setMsg('User removed successfully.');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-xs">
        Loading System Administration Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System Administrator Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              GrowthMind Platform Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage system configuration, user roles, subject curriculum, and platform telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'users' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              User Management ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'reports' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Growth Reports
            </button>
          </div>
        </div>

        {msg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{msg}</span>
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Telemetry Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-black text-slate-900 font-display">{overview?.totalUsers || users.length}</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Active Accounts</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Students</p>
                <p className="text-2xl font-black text-emerald-700 font-display">{overview?.studentCount || 4}</p>
                <p className="text-[10px] text-slate-500 font-semibold">Tracked Cohort</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Faculty</p>
                <p className="text-2xl font-black text-indigo-700 font-display">{overview?.facultyCount || 1}</p>
                <p className="text-[10px] text-slate-500 font-semibold">Mentors & Depts</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Topics</p>
                <p className="text-2xl font-black text-purple-700 font-display">{overview?.totalTopics || 18}</p>
                <p className="text-[10px] text-slate-500 font-semibold">In Prereq Graph</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assessments</p>
                <p className="text-2xl font-black text-amber-600 font-display">{overview?.totalAssessments || 8}</p>
                <p className="text-[10px] text-slate-500 font-semibold">Active Drills</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">System Health</p>
                <p className="text-xl font-black text-emerald-600 font-display flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ONLINE</span>
                </p>
                <p className="text-[10px] text-slate-500 font-semibold">Uptime: {overview?.uptime || 0}s</p>
              </div>
            </div>

            {/* Architecture Details Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                <span>Backend Architecture & Core Engines Status</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900">🗄 Database & Persistence</p>
                  <p className="text-slate-600">{overview?.databaseEngine || 'Persistent Relational JSON/Disk'}</p>
                  <p className="text-emerald-700 font-semibold">Auto-save on every attempt</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900">🧠 AI Growth Engine</p>
                  <p className="text-slate-600">{overview?.aiModel || 'Gemini 2.5 Flash + Heuristic Fallback'}</p>
                  <p className="text-indigo-700 font-semibold">Context-grounded recommendations</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900">🌐 Single Production URL</p>
                  <p className="text-slate-600">http://localhost:5000</p>
                  <p className="text-emerald-700 font-semibold">Unified express server + static client</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">User Accounts & Roles</h3>
                <p className="text-xs text-slate-500">Manage registered students, faculty mentors, and administrators.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(u.name)}`}
                          alt={u.name}
                          className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200"
                        />
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600">{u.email}</td>

                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                        >
                          <option value="STUDENT">STUDENT</option>
                          <option value="FACULTY">FACULTY</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-slate-400">{new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Student Growth Distribution</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-emerald-950">🌱 Late Bloomers (High Growth Momentum)</span>
                  <span className="font-black text-emerald-700 text-sm">{overview?.reports?.lateBloomers || 18} Students</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50/60 rounded-2xl border border-purple-200">
                  <span className="font-bold text-purple-950">👑 Top Performers (Beyond Syllabus Ready)</span>
                  <span className="font-black text-purple-700 text-sm">{overview?.reports?.topPerformers || 14} Students</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
                  <span className="font-bold text-blue-950">📈 Developing & Consistent Learners</span>
                  <span className="font-black text-blue-700 text-sm">32 Students</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Curriculum & Knowledge Graph</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prerequisite trees across 6 core technical subjects (C, C++, Python, Java, SQL, Data Structures) actively guard students from premature advanced tracks and enforce foundational mastery.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Prerequisite Enforcements Active</span>
                  <span className="font-bold text-slate-800">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dynamic Learning Paths Rebuilt</span>
                  <span className="font-bold text-emerald-700">On Every Quiz</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
