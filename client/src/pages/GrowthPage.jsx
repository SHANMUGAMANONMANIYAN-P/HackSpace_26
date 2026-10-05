// client/src/pages/GrowthPage.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { GrowthFingerprint } from '../components/GrowthFingerprint';
import { ScoreChangeExplainer } from '../components/ScoreChangeExplainer';
import { MistakeAnalyzer } from '../components/MistakeAnalyzer';
import { 
  Sprout, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Target, 
  Layers, 
  HelpCircle,
  BarChart2,
  Award
} from 'lucide-react';

export default function GrowthPage() {
  const { studentData, openQuiz } = useGrowth();

  if (!studentData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-sm">
        Loading Growth Fingerprint Analysis...
      </div>
    );
  }

  const isLateBloomer = studentData.fingerprint?.growthCategory === 'late_bloomer' || studentData.fingerprint?.title?.includes('Late Bloomer');
  const isTopPerformer = studentData.fingerprint?.growthCategory === 'topper' || studentData.fingerprint?.title?.includes('Top Performer');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Holistic Student Growth Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Growth Fingerprint & Trajectory Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Multi-dimensional evaluation: current performance, improvement rate, consistency, mistake control, topic mastery, and difficulty handling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs sm:text-sm font-extrabold px-4 py-2 rounded-2xl border ${
              isTopPerformer
                ? 'bg-purple-50 text-purple-800 border-purple-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              {studentData.fingerprint?.title || 'Late Bloomer – High Growth Potential'}
            </span>
          </div>
        </div>

        {/* Growth Fingerprint Radar & Metrics */}
        <GrowthFingerprint />

        {/* Causal Factor Explainer & Mistake Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScoreChangeExplainer />
          <MistakeAnalyzer />
        </div>

      </div>
    </div>
  );
}
