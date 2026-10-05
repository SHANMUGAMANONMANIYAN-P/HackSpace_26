// client/src/components/WhatNotToStudy.jsx
import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Compass,
  Info,
  ChevronDown
} from 'lucide-react';

export const WhatNotToStudy = ({ studentData, onNavigateToRoadmap }) => {
  const { targetNotStudyTopic, changeNotStudyTarget, openQuiz } = useGrowth();

  const [selectedInterest, setSelectedInterest] = useState(targetNotStudyTopic || 'Advanced AI');

  if (!studentData) return null;

  const topics = studentData.topics || [];
  
  // Prerequisite Knowledge Engine mapping
  const PREREQUISITE_RULES = {
    'Advanced AI': {
      prerequisites: [
        { name: 'Python Basics', required: 75, actual: 55 },
        { name: 'Functions', required: 75, actual: topics.find(t => t.name.toLowerCase() === 'functions')?.mastery || 48 },
        { name: 'Data Structures', required: 75, actual: topics.find(t => t.name.toLowerCase() === 'arrays')?.mastery || 52 },
      ],
      path: ['Python Basics', 'Functions', 'Data Structures', 'Machine Learning', 'Advanced AI'],
      description: 'Deep Learning, Transformers, and LLM Agent systems require solid recursion, matrix indexing, and algorithmic data flow.'
    },
    'Machine Learning': {
      prerequisites: [
        { name: 'Linear Algebra & Python', required: 75, actual: 60 },
        { name: 'Functions & Arrays', required: 75, actual: 50 },
      ],
      path: ['Python Basics', 'Functions & Arrays', 'Linear Algebra', 'Machine Learning'],
      description: 'Supervised & Unsupervised ML algorithms require clean vector manipulations and parameter scope comprehension.'
    },
    'Advanced Graph Algorithms': {
      prerequisites: [
        { name: 'Arrays & Indexing', required: 75, actual: topics.find(t => t.name.toLowerCase() === 'arrays')?.mastery || 52 },
        { name: 'Recursion & Functions', required: 75, actual: topics.find(t => t.name.toLowerCase() === 'functions')?.mastery || 48 },
      ],
      path: ['Arrays', 'Functions', 'Recursion', 'Basic Trees', 'Advanced Graph Algorithms'],
      description: 'Shortest path, Min-Cut, and topological sort depend on rigorous pointer/index mechanics.'
    },
    'Dynamic Programming': {
      prerequisites: [
        { name: 'Recursion & Scope', required: 75, actual: 48 },
        { name: '1D/2D Arrays', required: 75, actual: 52 },
      ],
      path: ['Arrays', 'Recursion', 'Time Complexity', 'Dynamic Programming'],
      description: 'Memoization and state transitions require zero doubt in array indexing and function call stacks.'
    }
  };

  const rule = PREREQUISITE_RULES[selectedInterest] || PREREQUISITE_RULES['Advanced AI'];
  
  // Check if any prerequisite is below requirement
  const weakPrereqs = rule.prerequisites.filter(p => p.actual < p.required);
  const isBlocked = weakPrereqs.length > 0;

  const handleInterestChange = (topic) => {
    setSelectedInterest(topic);
    changeNotStudyTarget(topic);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              Smart Learning Priority
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Intelligent pedagogical gating: Advising students what <strong className="text-slate-800">NOT to study yet</strong> to prevent cognitive overload.
          </p>
        </div>

        {/* Topic Selector Filter for Demo Simulation */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Evaluating Interest:</span>
          <select
            value={selectedInterest}
            onChange={(e) => handleInterestChange(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            <option value="Advanced AI">Advanced AI (Deep Learning)</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Advanced Graph Algorithms">Advanced Graph Algorithms</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
          </select>
        </div>
      </div>

      {/* Main Prominent Innovation Warning Card */}
      {isBlocked ? (
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-rose-500/10 rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-md space-y-6 relative overflow-hidden">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full">
                  Prerequisite Gate Triggered
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-display">
                ⚠️ {selectedInterest} is not your current priority.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                Reason: “Your prerequisite concepts need more practice first.”
              </p>
            </div>
          </div>

          {/* Missing Prerequisite Metrics */}
          <div className="bg-white/90 rounded-2xl p-5 border border-amber-200/80 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Gaps Detected by Knowledge Graph Engine:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rule.prerequisites.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{p.name}</span>
                    <span className={`font-extrabold ${p.actual < p.required ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {p.actual}% / {p.required}% req
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${p.actual < p.required ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, p.actual)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Sequential Path */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recommended Sequential Roadmap to Unlock {selectedInterest}:
            </h4>

            <div className="flex flex-wrap items-center gap-2">
              {rule.path.map((step, idx) => {
                const isFinal = idx === rule.path.length - 1;
                const isFirst = idx === 0;
                return (
                  <React.Fragment key={idx}>
                    <div className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isFinal
                        ? 'bg-amber-100/60 border-amber-300 text-amber-900'
                        : isFirst
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                    }`}>
                      <span>{step}</span>
                      {isFinal && <span className="text-[10px] bg-amber-200 text-amber-900 px-1 rounded-sm">Target</span>}
                    </div>

                    {!isFinal && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                if (onNavigateToRoadmap) onNavigateToRoadmap();
                else openQuiz('Functions');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>View Recommended Path</span>
            </button>

            <button
              onClick={() => openQuiz('Functions')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl border border-slate-300 transition-colors shadow-2xs"
            >
              <span>Practice Prerequisite Topic (Functions)</span>
            </button>
          </div>

        </div>
      ) : (
        /* Target Topic is Ready/Unlocked */
        <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 text-slate-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                ✅ Ready for {selectedInterest}!
              </h3>
              <p className="text-xs text-slate-600">
                You have demonstrated required mastery (≥75%) in all prerequisite concepts.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
