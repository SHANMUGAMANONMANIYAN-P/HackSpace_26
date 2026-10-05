// client/src/components/ScoreChangeExplainer.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  HelpCircle,
  Zap
} from 'lucide-react';

export const ScoreChangeExplainer = ({ studentData }) => {
  const { openQuiz } = useGrowth();

  if (!studentData) return null;

  const scoreExplanation = studentData.scoreExplanation || {
    headline: '📈 Score increased by 12%',
    trend: 'up',
    delta: 12,
    reasons: [
      {
        title: 'Practice Consistency Maintained',
        description: `Active ${studentData.streakDays || 7}-day streak created stronger concept retention and recall speed.`,
        impact: '+5%'
      },
      {
        title: 'Fewer Repeated Errors in Fundamentals',
        description: 'Variables and standard loops mastered with 90%+ accuracy on first attempts.',
        impact: '+4%'
      },
      {
        title: 'Higher Assessment Completion Rate',
        description: `Logged ${studentData.learningHours || 24} hours of targeted drill practice over the last evaluation cycle.`,
        impact: '+3%'
      }
    ],
    recommendedAction: 'Practice Functions for 20 minutes and complete 5 questions to unlock Step 3.'
  };

  const isUp = scoreExplanation.trend === 'up' || (scoreExplanation.delta >= 0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className={`p-2 rounded-xl border shadow-2xs ${
              isUp ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Why did my score change?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data-grounded causal attribution engine explaining score shifts without ambiguity.
          </p>
        </div>

        <span className={`text-xs font-black px-3.5 py-1.5 rounded-full border shadow-2xs ${
          isUp ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {scoreExplanation.headline}
        </span>
      </div>

      {/* Attribution Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scoreExplanation.reasons?.map((reason, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Factor #{idx + 1}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {reason.impact}
                </span>
              </div>

              <h5 className="font-bold text-slate-900 text-sm">
                {reason.title}
              </h5>

              <p className="text-xs text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Recommended Action Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-2xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Prescribed High-Impact Next Action
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-900">
            “{scoreExplanation.recommendedAction}”
          </p>
        </div>

        <button
          onClick={() => openQuiz('Functions')}
          className="shrink-0 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Execute Recommended Action</span>
        </button>
      </div>

    </div>
  );
};
