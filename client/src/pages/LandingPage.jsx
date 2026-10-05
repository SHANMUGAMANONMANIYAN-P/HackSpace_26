// client/src/pages/LandingPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGrowth } from '../context/GrowthContext';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Target, 
  Layers, 
  Zap, 
  Brain, 
  CheckCircle2, 
  Flame,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { switchPersona } = useAuth();
  const { openQuiz } = useGrowth();

  const handleLaunchDemo = (personaId = 'student-tharun') => {
    switchPersona(personaId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 gradient-hero-bg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs text-xs sm:text-sm font-bold animate-bounce [animation-duration:3s]">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Next-Gen EdTech Innovation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-500 font-semibold">Growth Momentum Engine</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
              Not Just a Score. <br />
              <span className="gradient-growth-text">A Growth Journey.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              An AI-powered learning mentor that understands where you are, how you are improving, and what you should do next.
            </p>
          </div>

          {/* Core USP Callout Box */}
          <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-emerald-200 shadow-md">
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              💡 <span className="text-emerald-700">“Others personalize what you learn.</span> GrowthMind personalizes how you grow.”
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => handleLaunchDemo('student-tharun')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Try Interactive Demo (Tharun)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-slate-300 shadow-2xs transition-colors"
            >
              <span>Explore How It Works</span>
            </a>
          </div>

          {/* Live Persona Quick Select Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Or test persona directly:</span>
            <button
              onClick={() => handleLaunchDemo('student-tharun')}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200 transition-colors"
            >
              🌱 Tharun (Late Bloomer +28%)
            </button>
            <button
              onClick={() => handleLaunchDemo('student-aadhya')}
              className="bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full border border-purple-200 transition-colors"
            >
              👑 Aadhya (Top Performer 92%)
            </button>
            <button
              onClick={() => handleLaunchDemo('faculty-sharma')}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full border border-indigo-200 transition-colors"
            >
              🎓 Prof. Sharma (Faculty View)
            </button>
          </div>

        </div>
      </section>

      {/* 3 Major Concepts Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-display">
              Different Journeys For Different Growth Curves
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Tailored Mentorship For Every Stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Concept 1: Top Performers */}
            <div className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    👑 For Top Performers
                  </span>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    “Go beyond the syllabus.”
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High performers are never held back with repetitive basic quizzes. We unlock advanced algorithms, real-world systems, hackathons, and research pathways.
                </p>
              </div>

              <button
                onClick={() => handleLaunchDemo('student-aadhya')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 pt-2"
              >
                <span>Preview Aadhya's Track</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Concept 2: Late Bloomers */}
            <div className="bg-emerald-50/40 rounded-3xl p-7 border-2 border-emerald-300 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group relative">
              <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
                Core Innovation
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <Sprout className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    🌱 For Late Bloomers
                  </span>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    “Build strong foundations and grow step by step.”
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We never label students as "weak". We analyze upward trajectory (+28%) and generate a 5-step recovery roadmap prioritizing parameter scope and foundational building blocks.
                </p>
              </div>

              <button
                onClick={() => handleLaunchDemo('student-tharun')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 pt-2"
              >
                <span>Preview Tharun's Recovery Roadmap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Concept 3: For Every Student */}
            <div className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    🎯 For Every Student
                  </span>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    “Get a learning path based on your own growth.”
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Dynamic prerequisite intelligence tells you what to study and <strong className="text-slate-800">what NOT to study yet</strong>, dynamically adjusting priority after every single practice drill.
                </p>
              </div>

              <button
                onClick={() => handleLaunchDemo('student-rohan')}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 pt-2"
              >
                <span>Explore Adaptive Pathway</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5-Step Process Flow Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-display">
              The Continuous Growth Loop
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Analyze → Identify → Personalize → Improve → Achieve
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">1</span>
              <h4 className="font-bold text-slate-900 text-sm">Analyze</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tracks trajectory slope, consistency streak, and repeated mistake clusters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">2</span>
              <h4 className="font-bold text-slate-900 text-sm">Identify</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Classifies into Growth Fingerprint (Late Bloomer, Top Performer, etc.) without punitive bias.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">3</span>
              <h4 className="font-bold text-slate-900 text-sm">Personalize</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Synthesizes custom recovery roadmap and flags "What NOT to study yet".
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center">4</span>
              <h4 className="font-bold text-slate-900 text-sm">Improve</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Execute targeted micro-drills on Functions and Arrays to resolve root-cause bugs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center">5</span>
              <h4 className="font-bold text-slate-900 text-sm">Achieve</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unlock advanced systems, hackathons, research publications, and career milestones.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Problem vs Solution Comparison Table */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
              Why Traditional Platforms Fail
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Generic Courseware vs GrowthMind AI Mentor
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5">Dimension</th>
                  <th className="p-4 sm:p-5 text-slate-300">Generic Online Courses & LMS</th>
                  <th className="p-4 sm:p-5 text-emerald-400 font-extrabold bg-slate-800">GrowthMind AI Mentor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-slate-50/50">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Core Focus</td>
                  <td className="p-4 sm:p-5 text-slate-600">Delivering static video lectures & fixed quizzes</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/60">Personalizing how the student grows over time</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Evaluation Model</td>
                  <td className="p-4 sm:p-5 text-slate-600">Static percentage averages (labels late bloomers as "weak")</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/60">Multi-factor Growth DNA (+28% momentum, resilience, consistency)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Learning Path</td>
                  <td className="p-4 sm:p-5 text-slate-600">Rigid chapter-by-chapter sequential syllabus</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/60">Dynamic & adaptive: Gating what NOT to study until prerequisites pass</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Top Performers</td>
                  <td className="p-4 sm:p-5 text-slate-600">Forced to repeat elementary syllabus lessons</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/60">Beyond the Syllabus track: Research, real projects, hackathons</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Faculty Insight</td>
                  <td className="p-4 sm:p-5 text-slate-600">Standard leaderboard ranking marks</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/60">Growth Comparison: Highlights highest momentum over static scores</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-tr from-slate-900 via-slate-900 to-emerald-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Ready to experience the future of personalized growth?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Launch the interactive hackathon demo immediately and inspect the live dynamic path recalculator.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleLaunchDemo('student-tharun')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Launch Live Hackathon Prototype →
            </button>
            <Link
              to="/auth"
              className="text-slate-300 hover:text-white font-semibold text-xs sm:text-sm px-6 py-4"
            >
              Sign In / Setup Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
