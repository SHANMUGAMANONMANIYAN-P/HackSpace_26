// client/src/components/LateBloomerRecovery.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  CheckCircle2, 
  Lock, 
  Flame, 
  Code2, 
  Layers, 
  Trophy, 
  ArrowRight, 
  Zap, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const LateBloomerRecovery = ({ studentData }) => {
  const { openQuiz } = useGrowth();

  if (!studentData) return null;

  const topics = studentData.topics || [];
  
  // Find topic mastery values
  const varTopic = topics.find(t => t.name.toLowerCase() === 'variables') || { mastery: 88 };
  const funcTopic = topics.find(t => t.name.toLowerCase() === 'functions') || { mastery: 48 };
  const arrTopic = topics.find(t => t.name.toLowerCase() === 'arrays') || { mastery: 52 };
  const loopTopic = topics.find(t => t.name.toLowerCase() === 'loops') || { mastery: 72 };

  const isStep1Complete = varTopic.mastery >= 75;
  const isStep2Complete = funcTopic.mastery >= 70 && arrTopic.mastery >= 70;

  const roadmapSteps = [
    {
      number: 'STEP 1',
      title: 'Strengthen Basics',
      topics: 'Variables, Data Types, Operators',
      status: isStep1Complete ? 'completed' : 'active',
      progress: varTopic.mastery,
      icon: CheckCircle2,
      badgeText: isStep1Complete ? 'Mastered (88%)' : 'In Progress',
      estimatedHours: '3 hrs',
      description: 'Solidify foundational memory models, stack allocations, and operator precedences.'
    },
    {
      number: 'STEP 2',
      title: 'Master Core Concepts',
      topics: 'Loops, Functions, Arrays',
      status: isStep1Complete ? (isStep2Complete ? 'completed' : 'active') : 'locked',
      progress: Math.round((funcTopic.mastery + arrTopic.mastery + loopTopic.mastery) / 3),
      icon: Flame,
      badgeText: isStep2Complete ? 'Mastered (75%)' : 'Current Target 🔥',
      estimatedHours: '5 hrs',
      description: 'Eliminate parameter passing confusion, array boundary errors, and nested loop bugs.',
      actionButton: !isStep2Complete && (
        <button
          onClick={() => openQuiz('Functions')}
          className="mt-3 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Practice Functions Drill (3 Qs)</span>
        </button>
      )
    },
    {
      number: 'STEP 3',
      title: 'Practice & Build',
      topics: 'Problem Solving + Mini Project',
      status: isStep2Complete ? 'active' : 'locked',
      progress: isStep2Complete ? 25 : 0,
      icon: Code2,
      badgeText: isStep2Complete ? 'Unlocked' : 'Unlocks at Step 2 (≥70%)',
      estimatedHours: '8 hrs',
      description: 'Combine functions, loops, and 1D/2D arrays into a cohesive working terminal application.'
    },
    {
      number: 'STEP 4',
      title: 'Advanced Learning',
      topics: 'Data Structures + OOP',
      status: 'locked',
      progress: 0,
      icon: Layers,
      badgeText: 'Locked (Step 3 Req.)',
      estimatedHours: '12 hrs',
      description: 'Transition into dynamic memory management, pointer manipulation, and object modeling.'
    },
    {
      number: 'STEP 5',
      title: 'Real World Challenge',
      topics: 'Hackathons + Projects',
      status: 'locked',
      progress: 0,
      icon: Trophy,
      badgeText: 'Locked (Step 4 Req.)',
      estimatedHours: '15 hrs',
      description: 'Compete in campus hackathons, solve real client problems, and prepare portfolio.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
              <Flame className="w-5 h-5 text-emerald-600" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              Your Growth Recovery Plan
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Foundational rebuilding sequence designed to resolve high-frequency bottlenecks and build mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Subject: C Programming & Systems
          </span>
        </div>
      </div>

      {/* Weak Areas Priority Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span>Target Topic Priorities</span>
          <span className="text-[10px] text-slate-400 font-normal">(Dynamic Order)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Functions */}
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">🔴 High Priority</span>
              <span className="text-xs font-extrabold text-rose-700">{funcTopic.mastery}%</span>
            </div>
            <h5 className="font-bold text-slate-900 text-sm">Functions</h5>
            <p className="text-[11px] text-slate-600">Repeated errors in pass-by-value vs reference.</p>
            <button
              onClick={() => openQuiz('Functions')}
              className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 pt-1"
            >
              <span>Practice Topic</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Arrays */}
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">🔴 High Priority</span>
              <span className="text-xs font-extrabold text-rose-700">{arrTopic.mastery}%</span>
            </div>
            <h5 className="font-bold text-slate-900 text-sm">Arrays</h5>
            <p className="text-[11px] text-slate-600">Off-by-one boundary checks in index traversal.</p>
            <button
              onClick={() => openQuiz('Arrays')}
              className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 pt-1"
            >
              <span>Practice Topic</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Strings */}
          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">🟡 Medium Priority</span>
              <span className="text-xs font-extrabold text-amber-700">64%</span>
            </div>
            <h5 className="font-bold text-slate-900 text-sm">Strings</h5>
            <p className="text-[11px] text-slate-600">Null-termination and character buffer sizing.</p>
            <span className="text-[11px] font-semibold text-amber-700 inline-block pt-1">
              Queued after Functions
            </span>
          </div>

          {/* Variables */}
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">🟢 Strong</span>
              <span className="text-xs font-extrabold text-emerald-700">{varTopic.mastery}%</span>
            </div>
            <h5 className="font-bold text-slate-900 text-sm">Variables</h5>
            <p className="text-[11px] text-slate-600">Solid foundation in memory declarations.</p>
            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3 h-3" /> Mastered
            </span>
          </div>

        </div>
      </div>

      {/* 5-Step Sequential Roadmap */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            5-Step Recovery Progression Roadmap
          </h4>
          <span className="text-xs text-slate-500 font-medium">Unlocks step-by-step</span>
        </div>

        <div className="space-y-3.5">
          {roadmapSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isLocked = step.status === 'locked';

            return (
              <div
                key={step.number}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                    : isCompleted
                    ? 'bg-slate-50/80 border-slate-200 text-slate-600'
                    : 'bg-slate-50/40 border-slate-200/60 opacity-60'
                }`}
              >
                
                {/* Left Step Meta */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isActive
                      ? 'bg-emerald-500 text-white animate-pulse shadow-md shadow-emerald-500/30'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        {step.number}
                      </span>
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-700 font-semibold">
                      {step.topics}
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-lg leading-relaxed">
                      {step.description}
                    </p>
                    {step.actionButton}
                  </div>
                </div>

                {/* Right Status Badge */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isCompleted
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {step.badgeText}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Est: {step.estimatedHours}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
