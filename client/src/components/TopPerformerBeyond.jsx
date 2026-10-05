// client/src/components/TopPerformerBeyond.jsx
import React from 'react';
import { 
  Rocket, 
  Code, 
  Trophy, 
  FileText, 
  Microscope, 
  Brain, 
  Lightbulb, 
  Users, 
  ArrowUpRight, 
  Sparkles,
  Award,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const TopPerformerBeyond = ({ studentData }) => {
  if (!studentData) return null;

  const beyondTracks = [
    {
      id: 'adv-topics',
      category: '🚀 Advanced Topics',
      title: 'Advanced Graph Algorithms & Memory Optimization',
      difficulty: 'Expert',
      xpReward: '+350 XP',
      tags: ['Dijkstra', 'Tarjan SCC', 'Cache Locality', 'Zero-Copy'],
      description: 'Dive deep into asymptotic complexity reduction, cache-aware data structures, and shortest-path graph optimization.',
      actionText: 'Start Advanced Module'
    },
    {
      id: 'projects',
      category: '💻 Real-world Projects',
      title: 'Build a High-Throughput Route Optimization Engine',
      difficulty: 'Industry-Grade',
      xpReward: '+500 XP',
      tags: ['C++', 'Graph Theory', 'Microservices', 'Benchmarking'],
      description: 'Implement an A* heuristic navigation engine handling 50,000 nodes with sub-10ms response latency.',
      actionText: 'Launch Project Workspace'
    },
    {
      id: 'hackathons',
      category: '🏆 Hackathons',
      title: 'National AI & Systems Hackathon 2026',
      difficulty: 'Competitive',
      xpReward: '+600 XP',
      tags: ['AI Agents', 'Distributed Systems', 'Live Demo'],
      description: 'Compete in the 48-hour challenge building autonomous multi-agent developer workflows.',
      actionText: 'Register Team / Enter'
    },
    {
      id: 'certifications',
      category: '📜 Industry Certifications',
      title: 'AWS Certified Solutions Architect & C++ Expert',
      difficulty: 'Professional',
      xpReward: '+400 XP',
      tags: ['Cloud Architecture', 'Security', 'Scalability'],
      description: 'Fast-track voucher and mock assessment series to validate enterprise cloud architecture skills.',
      actionText: 'Take Diagnostic Mock'
    },
    {
      id: 'research',
      category: '🔬 Research Opportunities',
      title: 'Survey on Memory-Efficient Dynamic Programming',
      difficulty: 'Academic',
      xpReward: '+450 XP',
      tags: ['LaTeX', 'Paper Reading', 'Empirical Study'],
      description: 'Collaborate with university lab on space-reduction heuristics in bioinformatics sequence alignment.',
      actionText: 'View Paper Draft'
    },
    {
      id: 'comp-prog',
      category: '🧠 Competitive Programming',
      title: 'Codeforces Div 1 & ICPC Regional Mock Series',
      difficulty: 'Hard',
      xpReward: '+300 XP',
      tags: ['Segment Trees', 'FFT', 'Game Theory'],
      description: 'Daily timed sprint problems targeting 2100+ rating tier with detailed editorial debriefs.',
      actionText: 'Solve Problem of the Day'
    },
    {
      id: 'mentoring',
      category: '👥 Peer Mentoring & Leadership',
      title: 'Lead C Programming Foundations Study Circle',
      difficulty: 'Leadership',
      xpReward: '+250 XP',
      tags: ['Mentorship', 'Code Review', 'Leadership Badge'],
      description: 'Host a weekly 30-min code review session helping late-bloomer peers resolve parameter passing bugs.',
      actionText: 'Open Peer Room'
    },
    {
      id: 'innovation',
      category: '💡 Innovation Challenges',
      title: 'Autonomous Campus AI Tutor Extension',
      difficulty: 'Innovation',
      xpReward: '+450 XP',
      tags: ['Gemini API', 'Vector Embeddings', 'Chrome Extension'],
      description: 'Design a contextual chrome extension providing real-time code execution stepping for freshmen.',
      actionText: 'Submit Proposal'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shadow-2xs">
              <Rocket className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              Beyond the Syllabus
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standard syllabus bypassed. Replaced with elite research, production projects, and competitive tracks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200 flex items-center gap-1.5 shadow-2xs">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Mastery: 92% (Tier 5 Unlocked)</span>
          </span>
        </div>
      </div>

      {/* Rationale Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>High Performer Acceleration Engine</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black font-display text-white">
            “You have mastered the current level. Your next challenge is Advanced Graph Algorithms.”
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            Because you consistently score above 90% across foundational data structures and algorithms, GrowthMind does not bore you with repetitive quizzes. We direct your energy towards portfolio-defining achievements.
          </p>
        </div>
      </div>

      {/* 8 Track Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {beyondTracks.map((track) => (
          <div
            key={track.id}
            className="p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200/60">
                  {track.category}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {track.xpReward}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-purple-700 transition-colors">
                {track.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {track.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {track.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                Tier: {track.difficulty}
              </span>
              <button className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{track.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
