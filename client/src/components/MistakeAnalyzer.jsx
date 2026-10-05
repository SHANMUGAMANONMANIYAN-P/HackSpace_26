// client/src/components/MistakeAnalyzer.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  AlertCircle, 
  HelpCircle, 
  RotateCcw, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Clock,
  Sparkles
} from 'lucide-react';

export const MistakeAnalyzer = ({ studentData }) => {
  const { openQuiz } = useGrowth();

  if (!studentData) return null;

  const mistakeAnalysis = studentData.mistakeAnalysis || {
    headline: 'Why am I losing marks?',
    summary: 'System detected 15 errors across 3 distinct recurring patterns.',
    primaryCulprit: {
      topic: 'Functions',
      errorPattern: 'Repeated mistake: Confusing pass-by-value with pass-by-reference in C.',
      recommendedPractice: 'Practice 5 parameter-passing problems before moving forward.'
    },
    mistakesList: studentData.mistakes || []
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 shadow-2xs">
              <AlertCircle className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Why am I losing marks?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated diagnostic engine detecting recurring conceptual bugs and prescribing micro-remedies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
            {mistakeAnalysis.mistakesList?.length || 3} Error Clusters Found
          </span>
        </div>
      </div>

      {/* Primary Culprit Callout */}
      <div className="bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-amber-500/10 rounded-2xl p-5 border border-rose-200/80 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-rose-600/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                Primary Score Leak: {mistakeAnalysis.primaryCulprit?.topic || 'Functions'}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                “{mistakeAnalysis.primaryCulprit?.errorPattern || 'Parameter passing by value instead of pointer reference.'}”
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                <strong className="text-slate-800">Recommendation:</strong> {mistakeAnalysis.primaryCulprit?.recommendedPractice || 'Practice 5 parameter-passing questions.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => openQuiz(mistakeAnalysis.primaryCulprit?.topic || 'Functions')}
            className="shrink-0 hidden sm:flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Fix Pattern Now</span>
          </button>
        </div>
      </div>

      {/* Mistake Pattern Cards List */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Recurring Error Breakdown & Code Diffs:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mistakeAnalysis.mistakesList?.map((m, idx) => (
            <div
              key={m.id || idx}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {m.topic}
                  </span>
                  <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {m.frequency}x Occurrences
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {m.errorPattern}
                </p>

                {m.sampleSnippet && (
                  <div className="bg-slate-900 text-rose-300 rounded-lg p-2.5 font-mono text-[11px] overflow-x-auto border border-slate-800 shadow-inner">
                    <code>{m.sampleSnippet}</code>
                  </div>
                )}

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-700">Root Cause:</span> {m.rootCause || 'Conceptual mental model confusion.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-bold">
                  Est. +6% score recovery
                </span>
                <button
                  onClick={() => openQuiz(m.topic)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Practice (3 Qs)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
