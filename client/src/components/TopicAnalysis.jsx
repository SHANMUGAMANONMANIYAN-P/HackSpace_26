// client/src/components/TopicAnalysis.jsx
import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  BarChart2, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const TopicAnalysis = ({ studentData }) => {
  const { openQuiz } = useGrowth();
  const [sortBy, setSortBy] = useState('weakest'); // 'weakest' | 'mastery' | 'priority' | 'attempts'

  if (!studentData) return null;

  const rawTopics = studentData.topics || [];

  // Sort logic
  const sortedTopics = [...rawTopics].sort((a, b) => {
    if (sortBy === 'weakest') return a.mastery - b.mastery;
    if (sortBy === 'mastery') return b.mastery - a.mastery;
    if (sortBy === 'attempts') return b.attempts - a.attempts;
    if (sortBy === 'priority') {
      const pOrder = { '🔴 High Priority': 1, '🟡 Medium Priority': 2, '🟢 Strong': 3 };
      return (pOrder[a.priority] || 2) - (pOrder[b.priority] || 2);
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs">
              <BarChart2 className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Topic Mastery & Granular Performance
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Topic-level diagnostic breakdown with precision error-recovery recommendations.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-medium text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            <option value="weakest">Weakest Topic (Priority Focus)</option>
            <option value="mastery">Highest Mastery</option>
            <option value="priority">Priority Tier</option>
            <option value="attempts">Practice Attempts</option>
          </select>
        </div>
      </div>

      {/* Topics Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 pl-2">Topic & Subject</th>
              <th className="pb-3 text-center">Mastery Score</th>
              <th className="pb-3 text-center">Attempts (Correct / Wrong)</th>
              <th className="pb-3 text-center">Priority</th>
              <th className="pb-3">Recommended Action</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedTopics.map((topic) => {
              const isHigh = topic.priority.includes('High');
              const isMedium = topic.priority.includes('Medium');
              const isStrong = topic.priority.includes('Strong');

              return (
                <tr key={topic.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Topic name */}
                  <td className="py-4 pl-2 font-bold text-slate-900">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{topic.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{topic.subject || 'Core CS'}</p>
                    </div>
                  </td>

                  {/* Mastery Progress Bar */}
                  <td className="py-4 text-center">
                    <div className="inline-flex flex-col items-center gap-1 w-28">
                      <span className={`font-black text-sm ${
                        isHigh ? 'text-rose-600' : isMedium ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {topic.mastery}%
                      </span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${topic.mastery}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Attempts */}
                  <td className="py-4 text-center">
                    <div className="font-semibold text-slate-700">
                      <span>{topic.attempts} attempts</span>
                      <p className="text-[10px] text-slate-400">
                        <span className="text-emerald-600 font-bold">{topic.correct} correct</span> / <span className="text-rose-500 font-bold">{topic.wrong} wrong</span>
                      </p>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block border ${
                      isHigh
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : isMedium
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {topic.priority}
                    </span>
                  </td>

                  {/* Recommended Action */}
                  <td className="py-4 text-slate-600 text-xs font-medium max-w-xs">
                    {topic.recommendedAction}
                  </td>

                  {/* Practice button */}
                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={() => openQuiz(topic.name)}
                      className="inline-flex items-center gap-1 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Drill</span>
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
