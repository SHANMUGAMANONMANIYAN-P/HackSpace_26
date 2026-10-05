// client/src/pages/OpportunitiesPage.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Sparkles, 
  Zap, 
  Code, 
  BookOpen, 
  Users, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Trophy,
  Flame,
  Layers
} from 'lucide-react';

const OPPORTUNITIES = [
  {
    category: 'Hackathons & Competitions',
    icon: Trophy,
    color: 'amber',
    items: [
      {
        title: 'Smart India Hackathon 2026',
        type: 'National Competition',
        deadline: 'In 18 Days',
        desc: 'Build AI-driven public sector solutions with high scalability and real societal impact.',
        tags: ['AI/ML', 'Full Stack', 'Cloud'],
        action: 'Form / Join Team'
      },
      {
        title: 'ACM-ICPC Regional Qualifier',
        type: 'Algorithmic Contest',
        deadline: 'In 24 Days',
        desc: 'Competitive programming drill focusing on dynamic programming, segment trees, and network flow.',
        tags: ['C++', 'Algorithms', 'Speed'],
        action: 'Start Practice Track'
      }
    ]
  },
  {
    category: 'Research & Systems Projects',
    icon: BookOpen,
    color: 'purple',
    items: [
      {
        title: 'Distributed Consensus Engine in Rust/C++',
        type: 'Systems Research',
        deadline: 'Ongoing',
        desc: 'Implement a Raft consensus protocol with persistent write-ahead logging and leader election.',
        tags: ['Distributed Systems', 'C++', 'Concurrency'],
        action: 'View Project Spec'
      },
      {
        title: 'Graph Neural Networks for Drug Discovery',
        type: 'AI Research Paper',
        deadline: 'Conference Track',
        desc: 'Collaborate with faculty on molecular property prediction benchmarks.',
        tags: ['PyTorch', 'GNN', 'Bioinformatics'],
        action: 'Contact Faculty Mentor'
      }
    ]
  },
  {
    category: 'Industry Certifications & Tracks',
    icon: Award,
    color: 'emerald',
    items: [
      {
        title: 'Google Cloud Professional Cloud Architect',
        type: 'Industry Certification',
        deadline: 'Voucher Eligible',
        desc: 'Master scalable cloud architectures, IAM security, Kubernetes, and BigQuery analytics.',
        tags: ['GCP', 'DevOps', 'Architecture'],
        action: 'Unlock Prep Drill'
      },
      {
        title: 'Certified Kubernetes Administrator (CKA)',
        type: 'Hands-on Certification',
        deadline: 'Self-Paced',
        desc: 'Production cluster provisioning, ingress controllers, storage volumes, and troubleshooting.',
        tags: ['K8s', 'Linux', 'Containers'],
        action: 'Access Sandbox'
      }
    ]
  },
  {
    category: 'Peer Mentoring & Leadership',
    icon: Users,
    color: 'indigo',
    items: [
      {
        title: 'Mentor C Programming Late Bloomers',
        type: 'Peer Mentorship',
        deadline: 'Earn +300 XP',
        desc: 'Help 2nd-year students master pointer mechanics and parameter passing. Earn verified leadership badge.',
        tags: ['Mentorship', 'Leadership', 'Teaching'],
        action: 'Sign Up as Mentor'
      }
    ]
  }
];

export default function OpportunitiesPage() {
  const { studentData } = useGrowth();
  const { activePersonaId } = useAuth();

  const isTopPerformer = studentData?.fingerprint?.growthCategory === 'topper' || activePersonaId === 'usr-aadhya';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Beyond the Syllabus Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Advanced Opportunities & High-Impact Challenges
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Moving beyond scores to real-world capability. Curated research projects, national hackathons, elite competitive programming, and peer mentorship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-purple-400/30 p-4 rounded-2xl text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
              <p className="text-sm font-black text-purple-300">
                {isTopPerformer ? '👑 Top Performer Track' : '🚀 Unlocking Step-by-Step'}
              </p>
            </div>
          </div>
        </div>

        {/* Opportunity Categories Grid */}
        <div className="space-y-8">
          {OPPORTUNITIES.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <div key={sIdx} className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl bg-${section.color}-500/10 text-${section.color}-600 flex items-center justify-center border border-${section.color}-200`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {section.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {item.type}
                          </span>
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            {item.deadline}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 font-display">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {item.tags.map(t => (
                            <span key={t} className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                        <span>{item.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
