// client/src/components/GrowthFingerprint.jsx
import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Award, 
  Flame, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export const GrowthFingerprint = ({ studentData }) => {
  if (!studentData) return null;

  const fingerprint = studentData.fingerprint || {
    classification: 'Late Bloomer',
    title: 'Late Bloomer – High Growth Potential',
    subtitle: 'Strong Upward Velocity ↑',
    badgeColor: 'emerald',
    explanation: 'You may not be the fastest learner, but your consistent improvement shows strong growth potential.',
    radarMetrics: [
      { subject: 'Current Performance', value: 75, fullMark: 100 },
      { subject: 'Improvement Rate', value: 93, fullMark: 100 },
      { subject: 'Consistency', value: 70, fullMark: 100 },
      { subject: 'Mistake Control', value: 45, fullMark: 100 },
      { subject: 'Topic Mastery', value: 61, fullMark: 100 },
      { subject: 'Challenge Handling', value: 72, fullMark: 100 },
    ]
  };

  const testTrajectory = studentData.tests || [
    { testName: 'Test 1', score: 40 },
    { testName: 'Test 2', score: 48 },
    { testName: 'Test 3', score: 57 },
    { testName: 'Test 4', score: 68 },
    { testName: 'Test 5', score: 75 }
  ];

  const momentum = studentData.momentumPercentage || 28;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              Your Growth Fingerprint
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-dimensional learning DNA based on trajectory velocity, consistency, and error patterns.
          </p>
        </div>

        {/* Classification Tag */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-2xl border text-left shadow-2xs ${
            fingerprint.badgeColor === 'purple'
              ? 'bg-purple-50 border-purple-200 text-purple-900'
              : fingerprint.badgeColor === 'emerald'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Growth Classification</p>
            <p className="text-sm font-black flex items-center gap-1.5 font-display">
              {fingerprint.title}
            </p>
          </div>
        </div>
      </div>

      {/* Main supportive description card */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-indigo-500/10 rounded-2xl p-5 border border-emerald-200/60 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20 mt-0.5">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              Personalized Trajectory Diagnosis:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              “{fingerprint.explanation}”
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 bg-white/80 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                +{momentum}% Overall Momentum
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                High Growth Potential Index
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Radar Polygon Chart (6 Metrics) */}
        <div className="lg:col-span-6 bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              6-Axis Skill Radar
            </h4>
            <span className="text-[11px] text-slate-500">Holistic Evaluation</span>
          </div>

          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={fingerprint.radarMetrics}>
                <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                <Radar
                  name="Student DNA"
                  dataKey="value"
                  stroke="#059669"
                  fill="#10b981"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Score Progression Area Chart */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60">
            <div className="flex items-center justify-between mb-3 px-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Performance Growth Curve
                </h4>
                <p className="text-[11px] text-slate-500">From baseline diagnostic to current assessment</p>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {testTrajectory[0]?.score}% → {testTrajectory[testTrajectory.length - 1]?.score}%
              </span>
            </div>

            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={testTrajectory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="testName" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                    formatter={(value) => [`${value}% Score`, 'Result']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#059669" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#growthGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Trajectory Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Improvement</p>
              <p className="text-base font-extrabold text-emerald-600">+{momentum}%</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Resilience Index</p>
              <p className="text-base font-extrabold text-indigo-600">92 / 100</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Volatility</p>
              <p className="text-base font-extrabold text-slate-800">Low (Stable)</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
