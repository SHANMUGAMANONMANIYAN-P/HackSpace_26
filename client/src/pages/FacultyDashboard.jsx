// client/src/pages/FacultyDashboard.jsx
import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Award, 
  ShieldAlert, 
  Layers, 
  BarChart3, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  ArrowUpRight,
  Filter,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

export const FacultyDashboard = () => {
  const { facultyData, growthComparisonList } = useGrowth();
  const { switchPersona } = useAuth();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'high_growth' | 'late_bloomer' | 'topper' | 'support'
  const [interventionModal, setInterventionModal] = useState({ isOpen: false, studentName: '' });

  const cohortData = facultyData || {
    name: 'Prof. Sharma',
    department: 'Computer Science & Engineering',
    totalStudents: 64,
    stats: {
      averageScore: 76.4,
      averageGrowthMomentum: '+13.8%',
      topPerformersCount: 14,
      lateBloomersCount: 18,
      developingLearnersCount: 22,
      needsSupportCount: 10
    },
    difficultTopics: [
      { name: 'Pointers & Dynamic Memory', averageMastery: 45, failureRate: '42%' },
      { name: 'Functions & Parameter Passing', averageMastery: 53, failureRate: '34%' },
      { name: 'Async JS & Promises', averageMastery: 58, failureRate: '29%' },
      { name: 'Nested Loops & Boundary Traversal', averageMastery: 66, failureRate: '21%' }
    ]
  };

  const studentList = growthComparisonList.length > 0 ? growthComparisonList : [
    {
      id: 'student-tharun',
      name: 'Tharun',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      currentScore: 75,
      growthMomentum: 28,
      classification: 'Late Bloomer – High Growth Potential',
      badgeColor: 'emerald',
      highestPriorityTopic: 'Functions',
      streak: 7,
      highlight: '⭐ Highest Growth Momentum (+28%)'
    },
    {
      id: 'student-aadhya',
      name: 'Aadhya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      currentScore: 92,
      growthMomentum: 4,
      classification: 'Top Performer – Beyond Syllabus',
      badgeColor: 'purple',
      highestPriorityTopic: 'Advanced Graph Algorithms',
      streak: 24,
      highlight: '👑 Top Absolute Score (92%)'
    },
    {
      id: 'student-rohan',
      name: 'Rohan',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      currentScore: 61,
      growthMomentum: 12,
      classification: 'Developing Learner – Steady Growth',
      badgeColor: 'blue',
      highestPriorityTopic: 'Async JS & Promises',
      streak: 4,
      highlight: 'Steady Progress'
    },
    {
      id: 'student-priya',
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      currentScore: 78,
      growthMomentum: 10,
      classification: 'Consistent Learner – High Discipline',
      badgeColor: 'cyan',
      highestPriorityTopic: 'B-Tree Indexing',
      streak: 16,
      highlight: 'High Consistency Streak'
    }
  ];

  const filteredStudents = studentList.filter(s => {
    if (activeFilter === 'late_bloomer') return s.classification.includes('Late Bloomer');
    if (activeFilter === 'topper') return s.classification.includes('Top Performer');
    if (activeFilter === 'high_growth') return s.growthMomentum >= 15;
    if (activeFilter === 'support') return s.currentScore < 65 && s.growthMomentum < 15;
    return true;
  });

  const pieData = [
    { name: 'Late Bloomers', value: 18, color: '#10b981' },
    { name: 'Top Performers', value: 14, color: '#a855f7' },
    { name: 'Developing', value: 22, color: '#3b82f6' },
    { name: 'Needs Support', value: 10, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
                <GraduationCap className="w-6 h-6" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Faculty Command Center
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Department of Computer Science & Engineering • Cohort: <strong className="text-slate-700">64 Enrolled Students</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-indigo-50 text-indigo-800 px-3.5 py-2 rounded-2xl border border-indigo-200 shadow-2xs">
              Welcome, {cohortData.name}
            </span>
          </div>
        </div>

        {/* Cohort KPI Metrics (5 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Enrolled</p>
            <p className="text-2xl font-black text-slate-900 font-display">64</p>
            <p className="text-[10px] text-slate-500">Active Students</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-1 bg-emerald-50/20">
            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Avg Growth Velocity</p>
            <p className="text-2xl font-black text-emerald-700 font-display">+13.8%</p>
            <p className="text-[10px] text-emerald-700 font-semibold">Positive Momentum</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Late Bloomers</p>
            <p className="text-2xl font-black text-emerald-600 font-display">18</p>
            <p className="text-[10px] text-slate-500">High Growth Potential</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Top Performers</p>
            <p className="text-2xl font-black text-purple-600 font-display">14</p>
            <p className="text-[10px] text-slate-500">Beyond Syllabus</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-1 bg-amber-50/20">
            <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Targeted Guidance</p>
            <p className="text-2xl font-black text-amber-600 font-display">10</p>
            <p className="text-[10px] text-amber-700 font-semibold">Micro-Drills Queued</p>
          </div>

        </div>

        {/* Growth Comparison Table (USP Highlight) */}
        <div id="comparison" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
                  Student Growth Comparison
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-emerald-700">Not a conventional marks leaderboard.</strong> Highlights improvement velocity & growth trajectory.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Students
              </button>
              <button
                onClick={() => setActiveFilter('high_growth')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeFilter === 'high_growth' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                High Growth (≥15%)
              </button>
              <button
                onClick={() => setActiveFilter('late_bloomer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeFilter === 'late_bloomer' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Late Bloomers
              </button>
              <button
                onClick={() => setActiveFilter('topper')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeFilter === 'topper' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Top Performers
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Student</th>
                  <th className="pb-3 text-center">Current Score</th>
                  <th className="pb-3 text-center">Growth Momentum ⭐</th>
                  <th className="pb-3">Growth Classification</th>
                  <th className="pb-3">Current Priority Topic</th>
                  <th className="pb-3">Streak</th>
                  <th className="pb-3 text-right pr-2">Faculty Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const isTharun = student.id === 'student-tharun';
                  return (
                    <tr 
                      key={student.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isTharun ? 'bg-emerald-50/40 font-semibold' : ''
                      }`}
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                            <p className="text-[10px] text-emerald-700 font-semibold">{student.highlight}</p>
                          </div>
                        </div>
                      </td>

                      {/* Current Score */}
                      <td className="py-4 text-center font-bold text-slate-800 text-sm">
                        {student.currentScore}%
                      </td>

                      {/* Growth Momentum (USP) */}
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center gap-1 font-black text-sm px-2.5 py-1 rounded-full ${
                          student.growthMomentum >= 20 
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          +{student.growthMomentum}%
                        </span>
                      </td>

                      {/* Classification */}
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block border ${
                          student.badgeColor === 'purple'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : student.badgeColor === 'emerald'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {student.classification}
                        </span>
                      </td>

                      {/* Priority Topic */}
                      <td className="py-4 text-slate-700 font-semibold">
                        {student.highestPriorityTopic}
                      </td>

                      {/* Streak */}
                      <td className="py-4 text-slate-600">
                        🔥 {student.streak}d
                      </td>

                      {/* Quick Action */}
                      <td className="py-4 text-right pr-2">
                        <button
                          onClick={() => {
                            switchPersona(student.id);
                          }}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                        >
                          View Growth DNA →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Cohort Difficult Topics & Mistakes Breakdown */}
        <div id="analytics" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Difficult Topics List (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Department-Wide Challenging Topics</span>
              </h3>
              <span className="text-xs text-slate-400">Lowest cohort masteries</span>
            </div>

            <div className="space-y-3">
              {cohortData.difficultTopics.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900">{t.name}</span>
                    <span className="text-rose-600">Avg Mastery: {t.averageMastery}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${t.averageMastery}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Failure rate: <strong className="text-slate-700">{t.failureRate}</strong> • GrowthMind automatically prescribes parameter & boundary micro-drills.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Distribution Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Growth DNA Distribution</span>
              </h3>
            </div>

            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val} Students`, 'Count']} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600">
              💡 <strong>28% of cohort</strong> identified as Late Bloomers showing high growth momentum.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
