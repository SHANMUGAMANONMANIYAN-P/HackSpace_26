// client/src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { GrowthFingerprint } from '../components/GrowthFingerprint';
import { LateBloomerRecovery } from '../components/LateBloomerRecovery';
import { TopPerformerBeyond } from '../components/TopPerformerBeyond';
import { WhatNotToStudy } from '../components/WhatNotToStudy';
import { DynamicLearningPath } from '../components/DynamicLearningPath';
import { TopicAnalysis } from '../components/TopicAnalysis';
import { MistakeAnalyzer } from '../components/MistakeAnalyzer';
import { ScoreChangeExplainer } from '../components/ScoreChangeExplainer';
import { GamificationBadges } from '../components/GamificationBadges';
import { AIMentorDrawer } from '../components/AIMentorDrawer';
import { 
  Sprout, 
  Sparkles, 
  Flame, 
  Target, 
  Layers, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  BarChart2, 
  CheckCircle2, 
  Zap, 
  Bot, 
  Award,
  HelpCircle,
  ArrowUpRight,
  BookOpen,
  Info,
  Compass
} from 'lucide-react';

export const StudentDashboard = () => {
  const { studentData, openQuiz } = useGrowth();
  const { activePersonaId } = useAuth();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('overview');
  const [mentorDrawerOpen, setMentorDrawerOpen] = useState(false);
  const [showFactorsModal, setShowFactorsModal] = useState(false);

  // Sync tab with URL query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      if (tabParam === 'fingerprint') setActiveTab('fingerprint');
      else if (tabParam === 'roadmap') setActiveTab('roadmap');
      else if (tabParam === 'not_study') setActiveTab('not_study');
      else if (tabParam === 'topics') setActiveTab('topics');
      else if (tabParam === 'mistakes') setActiveTab('mistakes');
    }
  }, [location.search]);

  if (!studentData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-sm">
        Initializing GrowthMind Engine...
      </div>
    );
  }

  const isLateBloomer = studentData.fingerprint?.growthCategory === 'late_bloomer' || studentData.fingerprint?.classification?.toLowerCase().includes('late bloomer') || studentData.fingerprint?.title?.toLowerCase().includes('late bloomer');
  const isTopPerformer = studentData.fingerprint?.growthCategory === 'topper' || studentData.fingerprint?.classification?.toLowerCase().includes('top performer') || studentData.fingerprint?.title?.toLowerCase().includes('top performer');
  
  const growthScore = studentData.growthScore || 78;
  const momentum = studentData.momentumPercentage || 28;

  const tabs = [
    { id: 'overview', name: 'Growth Overview', icon: Compass },
    { id: 'fingerprint', name: 'Growth Fingerprint', icon: Sparkles },
    { id: 'roadmap', name: isTopPerformer ? 'Beyond Syllabus 👑' : 'Recovery Roadmap 🌱', icon: Layers },
    { id: 'not_study', name: 'Smart Priority ⚠️', icon: ShieldAlert },
    { id: 'topics', name: 'Topic Mastery', icon: BarChart2 },
    { id: 'mistakes', name: 'Mistake Analyzer', icon: HelpCircle },
    { id: 'explainer', name: 'Score Explainer', icon: TrendingUp },
    { id: 'gamification', name: 'Milestones & Badges', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Personalized Greeting Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight flex items-center gap-2">
              <span>Hello, {studentData.name} 👋</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isTopPerformer 
                  ? 'bg-purple-50 text-purple-800 border-purple-200' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {studentData.fingerprint?.classification || studentData.fingerprint?.title || 'Developing Learner – Steady Growth'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {studentData.department} • {studentData.semester} • Target: <strong className="text-slate-700">{studentData.learningGoals}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMentorDrawerOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Mentor</span>
            </button>
          </div>
        </div>

        {/* Hero Section: Growth Score Card & Today's Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Growth Score Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  Holistic Growth Score
                </span>
                <button
                  onClick={() => setShowFactorsModal(true)}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  View Formula Weights
                </button>
              </div>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white">
                  {growthScore}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 100</span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>High Growth Potential ↑ (+{momentum}% Velocity)</span>
              </p>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Calculated using performance (25%), improvement momentum (30%), consistency streak (15%), topic mastery (20%), and practice volume (10%).
              </p>
            </div>

            {/* Sub-metrics Pills */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
              <div className="p-2 bg-slate-800/60 rounded-xl">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Momentum</p>
                <p className="text-xs font-black text-emerald-400">+{momentum}%</p>
              </div>
              <div className="p-2 bg-slate-800/60 rounded-xl">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Streak</p>
                <p className="text-xs font-black text-amber-400">🔥 {studentData.streakDays} Days</p>
              </div>
              <div className="p-2 bg-slate-800/60 rounded-xl">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Mastery Avg</p>
                <p className="text-xs font-black text-indigo-300">{studentData.growthFactors?.topicMastery || 61}%</p>
              </div>
            </div>
          </div>

          {/* Today's Mission Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                  Today's Mission (Generated by Growth Engine)
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  +{studentData.dailyMission?.xpReward || 150} XP
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
                {studentData.dailyMission?.title || 'Master Parameter Passing in Functions'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {studentData.dailyMission?.description || 'Complete 5 practice questions on Functions and review yesterday\'s topic.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Est. Time: {studentData.dailyMission?.estimatedTime || '20 mins'}
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  Target Score: {studentData.dailyMission?.targetScore || '80%'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-semibold">
                Status: {studentData.dailyMission?.completed ? '✅ Completed Today' : 'Pending Action'}
              </span>

              <button
                onClick={() => openQuiz(studentData.dailyMission?.topic || 'Functions')}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Start Mission Drill Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quick Statistics Cards Grid (6 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Overall Accuracy</p>
            <p className="text-xl font-black text-slate-900 font-display">{studentData.currentScore}%</p>
            <p className="text-[10px] text-emerald-600 font-bold">Stable Benchmark</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Study Streak</p>
            <p className="text-xl font-black text-amber-500 font-display flex items-center gap-1">
              <Flame className="w-5 h-5 fill-amber-500" />
              <span>{studentData.streakDays} Days</span>
            </p>
            <p className="text-[10px] text-slate-500 font-semibold">Daily Habit Active</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Topics Mastered</p>
            <p className="text-xl font-black text-indigo-600 font-display">{studentData.topicsCompletedCount || 14}</p>
            <p className="text-[10px] text-slate-500 font-semibold">Across Curriculum</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Learning Hours</p>
            <p className="text-xl font-black text-slate-900 font-display">{studentData.learningHours || 24.5}h</p>
            <p className="text-[10px] text-emerald-600 font-bold">Consistent Activity</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1 bg-emerald-50/20">
            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Improvement %</p>
            <p className="text-xl font-black text-emerald-700 font-display">+{momentum}% ⭐</p>
            <p className="text-[10px] text-emerald-700 font-extrabold">High Momentum</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Assessments</p>
            <p className="text-xl font-black text-slate-900 font-display">{studentData.assessmentsCompletedCount || 18}</p>
            <p className="text-[10px] text-slate-500 font-semibold">Quizzes Logged</p>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="space-y-8">
          
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <DynamicLearningPath studentData={studentData} />
              <WhatNotToStudy studentData={studentData} onNavigateToRoadmap={() => setActiveTab('roadmap')} />
              <GrowthFingerprint studentData={studentData} />
              {isTopPerformer ? (
                <TopPerformerBeyond studentData={studentData} />
              ) : (
                <LateBloomerRecovery studentData={studentData} />
              )}
            </div>
          )}

          {activeTab === 'fingerprint' && (
            <div className="animate-in fade-in duration-150">
              <GrowthFingerprint studentData={studentData} />
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="animate-in fade-in duration-150 space-y-6">
              {isTopPerformer ? (
                <TopPerformerBeyond studentData={studentData} />
              ) : (
                <LateBloomerRecovery studentData={studentData} />
              )}
              <DynamicLearningPath studentData={studentData} />
            </div>
          )}

          {activeTab === 'not_study' && (
            <div className="animate-in fade-in duration-150 space-y-6">
              <WhatNotToStudy studentData={studentData} onNavigateToRoadmap={() => setActiveTab('roadmap')} />
              <DynamicLearningPath studentData={studentData} />
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="animate-in fade-in duration-150">
              <TopicAnalysis studentData={studentData} />
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="animate-in fade-in duration-150">
              <MistakeAnalyzer studentData={studentData} />
            </div>
          )}

          {activeTab === 'explainer' && (
            <div className="animate-in fade-in duration-150">
              <ScoreChangeExplainer studentData={studentData} />
            </div>
          )}

          {activeTab === 'gamification' && (
            <div className="animate-in fade-in duration-150">
              <GamificationBadges studentData={studentData} />
            </div>
          )}

        </div>

      </div>

      {/* Floating AI Mentor Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMentorDrawerOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-tr from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span>Ask Growth Mentor</span>
        </button>
      </div>

      {/* AI Mentor Drawer */}
      <AIMentorDrawer isOpen={mentorDrawerOpen} onClose={() => setMentorDrawerOpen(false)} />

      {/* Growth Formula Modal */}
      {showFactorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-base font-display">
                Growth Score Mathematical Formulation
              </h4>
              <button
                onClick={() => setShowFactorsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike traditional platforms that compute simple marks averages, GrowthMind evaluates multi-dimensional momentum:
            </p>

            <div className="space-y-2 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800">
              <p>G = 0.25 × Performance (25%)</p>
              <p>  + 0.30 × Improvement Velocity (30%)</p>
              <p>  + 0.15 × Consistency Streak (15%)</p>
              <p>  + 0.20 × Topic Mastery (20%)</p>
              <p>  + 0.10 × Practice Density (10%)</p>
            </div>

            <p className="text-[11px] text-emerald-700 font-bold">
              ⭐ This ensures that Late Bloomers with strong upward velocity (+28%) are recognized for high growth potential!
            </p>

            <button
              onClick={() => setShowFactorsModal(false)}
              className="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl mt-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function CompassIcon(props) {
  return <Sprout {...props} />;
}
