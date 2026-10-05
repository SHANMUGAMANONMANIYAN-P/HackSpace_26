// client/src/components/DynamicLearningPath.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  GitCommit, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Sparkles, 
  Layers, 
  Calendar,
  RotateCcw
} from 'lucide-react';

export const DynamicLearningPath = ({ studentData }) => {
  const { openQuiz } = useGrowth();

  if (!studentData) return null;

  const topics = studentData.topics || [];
  const funcMastery = topics.find(t => t.name.toLowerCase() === 'functions')?.mastery || 48;
  const arrMastery = topics.find(t => t.name.toLowerCase() === 'arrays')?.mastery || 52;

  const isFuncDone = funcMastery >= 70;
  const isArrDone = arrMastery >= 70;

  const dynamicStages = [
    {
      day: 'Current Phase',
      topic: 'Functions & Scope',
      mastery: `${funcMastery}%`,
      status: isFuncDone ? 'completed' : 'active',
      priority: isFuncDone ? 'Mastered' : '🔴 Current Priority',
      description: 'Resolve parameter passing bugs (pass-by-value vs pointers).',
      action: !isFuncDone && (
        <button
          onClick={() => openQuiz('Functions')}
          className="mt-2 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-transform hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Launch Functions Drill</span>
        </button>
      )
    },
    {
      day: 'Next Target',
      topic: '1D & 2D Arrays',
      mastery: `${arrMastery}%`,
      status: isFuncDone ? (isArrDone ? 'completed' : 'active') : 'queued',
      priority: isFuncDone ? '🔴 Shifted to Top Priority' : '🟡 Queued Target',
      description: 'Master boundary checks and contiguous memory offsets.',
      action: isFuncDone && !isArrDone && (
        <button
          onClick={() => openQuiz('Arrays')}
          className="mt-2 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-transform hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Launch Arrays Drill</span>
        </button>
      )
    },
    {
      day: 'Upcoming Target',
      topic: 'Strings & Char Pointers',
      mastery: '64%',
      status: isArrDone ? 'active' : 'locked',
      priority: '🟡 Queued',
      description: 'Null-termination rules, string length calculations, and memory safety.',
      action: null
    },
    {
      day: 'Future Stage',
      topic: 'Dynamic Memory & Structs',
      mastery: '0%',
      status: 'locked',
      priority: '🔒 Locked Future Stage',
      description: 'malloc/free mechanics, struct pointers, and building linked lists.',
      action: null
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Adaptive Dynamic Learning Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Path recalibrates automatically as quizzes are completed and topic masteries shift.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Live Reactive Engine
          </span>
        </div>
      </div>

      {/* Pipeline Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {dynamicStages.map((stage, idx) => {
          const isActive = stage.status === 'active';
          const isCompleted = stage.status === 'completed';
          const isLocked = stage.status === 'locked';

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 relative ${
                isActive
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200 text-slate-600'
                  : isLocked
                  ? 'bg-slate-50/40 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {stage.day}
                  </span>
                  <span className={`text-xs font-bold ${
                    isCompleted ? 'text-emerald-700' : isActive ? 'text-emerald-600 font-black' : 'text-slate-400'
                  }`}>
                    {stage.mastery}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <GitCommit className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                  )}
                  <span>{stage.topic}</span>
                </h4>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block ${
                  isActive
                    ? 'bg-emerald-200 text-emerald-950 font-extrabold'
                    : isCompleted
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {stage.priority}
                </span>

                {stage.action}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
