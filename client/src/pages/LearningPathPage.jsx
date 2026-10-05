// client/src/pages/LearningPathPage.jsx
import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { DynamicLearningPath } from '../components/DynamicLearningPath';
import { LateBloomerRecovery } from '../components/LateBloomerRecovery';
import { TopPerformerBeyond } from '../components/TopPerformerBeyond';
import { WhatNotToStudy } from '../components/WhatNotToStudy';
import { 
  Layers, 
  Sprout, 
  Award, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function LearningPathPage() {
  const { studentData, openQuiz } = useGrowth();
  const { activePersonaId } = useAuth();
  const [selectedSubTab, setSelectedSubTab] = useState('roadmap');

  if (!studentData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 text-sm">
        Loading Dynamic Learning Roadmap...
      </div>
    );
  }

  const isLateBloomer = studentData.fingerprint?.growthCategory === 'late_bloomer' || activePersonaId === 'usr-tharun' || studentData.fingerprint?.title?.includes('Late Bloomer');
  const isTopPerformer = studentData.fingerprint?.growthCategory === 'topper' || activePersonaId === 'usr-aadhya' || studentData.fingerprint?.title?.includes('Top Performer');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Adaptive Curriculum Progression</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Dynamic Learning Roadmap & Prerequisite Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              The roadmap automatically recalculates whenever your performance data changes.
            </p>
          </div>

          {/* Sub Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedSubTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSubTab === 'roadmap'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🗺 Dynamic Roadmap
            </button>

            <button
              onClick={() => setSelectedSubTab('not_study')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSubTab === 'not_study'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚠️ What NOT to Study Yet
            </button>
          </div>
        </div>

        {/* View Selection */}
        {selectedSubTab === 'roadmap' ? (
          <div className="space-y-8">
            {isTopPerformer ? <TopPerformerBeyond /> : <LateBloomerRecovery />}
            <DynamicLearningPath />
          </div>
        ) : (
          <div className="space-y-8">
            <WhatNotToStudy />
          </div>
        )}

      </div>
    </div>
  );
}
