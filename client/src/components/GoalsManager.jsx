// client/src/components/GoalsManager.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Calendar,
  X
} from 'lucide-react';

export const GoalsManager = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newDue, setNewDue] = useState('30 Days');

  const loadGoals = async () => {
    setLoading(true);
    try {
      const res = await api.getGoals();
      if (res && res.success) {
        setGoals(res.goals);
      }
    } catch (err) {
      console.error('Error loading goals:', err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newDescription.trim()) return;

    try {
      const res = await api.createGoal({
        description: newDescription,
        target: newTarget || 'Achieve ≥75% mastery',
        duePeriod: newDue
      });
      if (res && res.success) {
        setNewDescription('');
        setNewTarget('');
        setShowAddModal(false);
        loadGoals();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <Target className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">
              Personalized Learning Goals & Targets
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track milestone progress linked directly to your dynamic recommendations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Set New Goal</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((g) => (
          <div key={g.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  Target: {g.duePeriod}
                </span>
                <span className={`text-xs font-bold ${g.progress >= 70 ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {g.progress}% Progress
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 font-display">
                {g.description}
              </h4>

              <p className="text-xs text-slate-500">
                <strong className="text-slate-700">Milestone:</strong> {g.target}
              </p>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full ${g.progress >= 70 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                  style={{ width: `${Math.min(100, g.progress || 20)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Status: {g.status}
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Connected to Roadmap
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-base font-display">
                Set a New Learning Goal
              </h4>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Goal Description</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. Master C Functions & Pointers"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Milestone</label>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. Score ≥80% in next 3 diagnostic quizzes"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Timeline</label>
                <select
                  value={newDue}
                  onChange={(e) => setNewDue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="15 Days">15 Days (Sprint)</option>
                  <option value="30 Days">30 Days (1 Month)</option>
                  <option value="60 Days">60 Days (Midterm)</option>
                  <option value="90 Days">90 Days (Semester)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl shadow-sm"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
