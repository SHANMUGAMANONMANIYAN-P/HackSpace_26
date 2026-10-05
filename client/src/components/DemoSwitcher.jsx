// client/src/components/DemoSwitcher.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGrowth } from '../context/GrowthContext';
import { Sparkles, RotateCcw, Zap, GraduationCap, ShieldAlert, Award, TrendingUp } from 'lucide-react';

export const DemoSwitcher = () => {
  const { activePersonaId, switchPersona, allPersonas } = useAuth();
  const { openQuiz, resetDemo } = useGrowth();

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 py-2.5 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Hackathon Persona Switcher Tag */}
        <div className="flex items-center gap-2 font-medium shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 uppercase tracking-wider font-semibold text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Demo Switcher:
          </span>
        </div>

        {/* Middle: Persona Switch Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {allPersonas.map((p) => {
            const isActive = activePersonaId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchPersona(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-400/40 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-4 h-4 rounded-full object-cover border border-white/40"
                />
                <span>{p.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-slate-400'
                }`}>
                  {(p.id === 'usr-tharun' || p.name === 'Tharun') && '🌱 Late Bloomer (+28%)'}
                  {(p.id === 'usr-aadhya' || p.name === 'Aadhya') && '👑 Top Performer (92%)'}
                  {(p.id === 'usr-rohan' || p.name === 'Rohan') && '📈 Developing (61%)'}
                  {(p.id === 'usr-priya' || p.name === 'Priya') && '🔥 Consistent (78%)'}
                  {(p.id === 'usr-sharma' || p.name === 'Prof. Sharma') && '🎓 Faculty View'}
                  {(p.id === 'usr-admin' || p.name === 'System Admin') && '🛡 Admin View'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Interactive Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openQuiz('Functions')}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-3 py-1.5 rounded-full text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
            title="Take a live 3-question quiz on Functions to watch the dynamic path recalculate in real-time"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-200" />
            <span>⚡ Test Live Quiz</span>
          </button>

          <button
            onClick={resetDemo}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 px-2.5 py-1.5 rounded-full text-xs border border-slate-700/50 transition-colors"
            title="Reset student scores to demo defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
