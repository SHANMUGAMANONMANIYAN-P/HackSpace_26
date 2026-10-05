// client/src/components/Footer.jsx
import React from 'react';
import { Sprout, Heart, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & USP */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 stroke-[2.4]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Growth<span className="text-emerald-400">Mind</span>
              </span>
            </div>
            
            <p className="text-emerald-400 font-semibold text-sm">
              “Others personalize what you learn. GrowthMind personalizes how you grow.”
            </p>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              An AI-powered student growth mentor that moves beyond static marks and course catalogs. By analyzing improvement velocity, consistency streaks, and mistake patterns, GrowthMind builds custom growth roadmaps for every student.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 bg-slate-800 text-emerald-400 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-700">
                <Sparkles className="w-3 h-3" />
                Analyze → Identify → Personalize → Improve → Achieve
              </span>
            </div>
          </div>

          {/* Col 2: Core Innovations */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 font-display">
              Key Innovations
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                🌱 Late Bloomer Recovery Mode
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                👑 Top Performer "Beyond Syllabus"
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                ⚠️ "What Should I NOT Study Now?"
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                🧬 Multi-factor Growth Fingerprint
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                📈 Momentum-First Faculty Analytics
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-white transition-colors">
                  Faculty Command Center
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="hover:text-white transition-colors">
                  AI Mentor Chat
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-white transition-colors">
                  Login & Onboarding
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 GrowthMind AI Mentor. Built for Next-Gen Student Empowerment.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Non-punitive AI Evaluation Engine
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
