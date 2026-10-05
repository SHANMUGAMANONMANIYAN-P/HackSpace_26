// client/src/components/GamificationBadges.jsx
import React from 'react';
import { 
  Award, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Trophy, 
  Target, 
  Star,
  ShieldCheck
} from 'lucide-react';

export const GamificationBadges = ({ studentData }) => {
  if (!studentData) return null;

  const levels = [
    { title: '🌱 Beginner', minXP: 0 },
    { title: '📚 Foundation', minXP: 1000 },
    { title: '💪 Improving', minXP: 2000 },
    { title: '🔥 Consistent', minXP: 3500 },
    { title: '🚀 Advanced', minXP: 5000 },
    { title: '🏆 Expert', minXP: 7000 },
  ];

  const badges = studentData.badges || [
    { id: 'bdg-1', title: '7-Day Streak', icon: Flame, description: 'Maintained 7 consecutive active study days', unlocked: true },
    { id: 'bdg-2', title: 'Growth Rocket', icon: TrendingUp, description: 'Improved overall score by +25% in one semester', unlocked: true },
    { id: 'bdg-3', title: 'Variables Master', icon: CheckCircle2, description: 'Scored 88%+ in Variables & Types', unlocked: true },
    { id: 'bdg-4', title: 'Functions Crusher', icon: Target, description: 'Master Functions & Parameter Passing', unlocked: false }
  ];

  const currentXP = studentData.totalXP || 2450;
  const currentLevel = studentData.currentLevel || '💪 Improving';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
              <Trophy className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Personal Growth Milestones & Badges
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rewarding resilience, consistency, and conceptual mastery rather than peer comparison.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-indigo-50 text-indigo-800 px-3.5 py-1.5 rounded-full border border-indigo-200 flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{currentXP.toLocaleString()} Total Growth XP</span>
          </span>
        </div>
      </div>

      {/* Level Progression Stepper */}
      <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Current Growth Tier: <strong className="text-emerald-700">{currentLevel}</strong></span>
          <span className="text-slate-400">Next Tier: 🔥 Consistent (at 3,500 XP)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {levels.map((lvl, idx) => {
            const isReached = currentXP >= lvl.minXP;
            const isCurrent = currentLevel.includes(lvl.title.slice(3));

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center text-xs transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400'
                    : isReached
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <p className="text-[11px] truncate">{lvl.title}</p>
                <p className="text-[9px] opacity-80 mt-0.5">{lvl.minXP} XP</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Earned Mastery Badges
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const isUnlocked = badge.unlocked;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isUnlocked
                    ? 'bg-white border-slate-200 shadow-2xs hover:shadow-md'
                    : 'bg-slate-50/40 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-md shadow-amber-500/20'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isUnlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{badge.title}</h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{badge.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className={`font-bold ${isUnlocked ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {isUnlocked ? '✅ Unlocked' : '🔒 Locked'}
                  </span>
                  <span className="text-slate-400 font-medium">Growth Badge</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
