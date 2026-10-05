// client/src/pages/GoalsPage.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useGrowth } from '../context/GrowthContext';
import { 
  Target, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  Edit3, 
  Save, 
  X,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    description: '',
    target: '',
    duePeriod: '30 Days'
  });
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editProgress, setEditProgress] = useState(50);
  const [saving, setSaving] = useState(false);

  const { refreshData } = useGrowth();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await api.getGoals();
      if (res && res.success) {
        setGoals(res.goals || []);
      }
    } catch (err) {
      console.error('Error fetching goals:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.description || !newGoal.target) return;
    setSaving(true);
    try {
      const res = await api.createGoal(newGoal);
      if (res && res.success) {
        setGoals(prev => [res.goal, ...prev]);
        setShowAddModal(false);
        setNewGoal({ description: '', target: '', duePeriod: '30 Days' });
        if (refreshData) await refreshData();
      }
    } catch (err) {
      console.error('Error creating goal:', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProgress = async (goalId) => {
    try {
      const status = editProgress >= 100 ? 'Completed' : 'In Progress';
      const res = await api.updateGoal(goalId, { progress: editProgress, status });
      if (res && res.success) {
        setGoals(goals.map(g => g.id === goalId ? { ...g, progress: editProgress, status } : g));
        setEditingGoalId(null);
        if (refreshData) await refreshData();
      }
    } catch (err) {
      console.error('Error updating goal:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target & Mastery Milestones</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Goals & Progress Tracking
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Set realistic mastery targets. GrowthMind adapts daily missions and recommendations based on your goals.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Set New Learning Goal</span>
          </button>
        </div>

        {/* Goals Grid */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center text-slate-500 text-xs">
            Loading Student Goals...
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <Target className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-700 text-sm">No active goals yet</h3>
            <p className="text-xs text-slate-400">Click the button above to set your first growth target.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const isCompleted = goal.status === 'Completed' || goal.progress >= 100;
              const isLocked = goal.status?.includes('Locked');

              return (
                <div
                  key={goal.id}
                  className={`bg-white rounded-3xl p-6 border ${
                    isCompleted ? 'border-emerald-300 bg-emerald-50/20' :
                    isLocked ? 'border-slate-200 bg-slate-50/50' :
                    'border-slate-200/90'
                  } shadow-2xs flex flex-col justify-between space-y-5`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                        isCompleted ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        isLocked ? 'bg-slate-100 text-slate-600 border-slate-200' :
                        'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {goal.status || 'In Progress'}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {goal.duePeriod || '30 Days'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {goal.description}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      🎯 Target: <strong className="text-slate-800">{goal.target}</strong>
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-emerald-700">{goal.progress || 0}%</span>
                    </div>

                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-300"
                        style={{ width: `${Math.min(100, goal.progress || 0)}%` }}
                      />
                    </div>

                    {editingGoalId === goal.id ? (
                      <div className="pt-2 space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editProgress}
                          onChange={(e) => setEditProgress(Number(e.target.value))}
                          className="w-full accent-emerald-600"
                        />
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold">{editProgress}%</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingGoalId(null)}
                              className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateProgress(goal.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingGoalId(goal.id);
                          setEditProgress(goal.progress || 0);
                        }}
                        className="text-[11px] font-bold text-slate-500 hover:text-emerald-700 flex items-center gap-1 pt-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Update Progress</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Set New Learning Goal</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Goal Description <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="e.g. Master Data Structures in 30 days"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Specific Target / Milestone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    placeholder="e.g. Score ≥85% in Binary Search Trees & Graph Drills"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Timeframe
                  </label>
                  <select
                    value={newGoal.duePeriod}
                    onChange={(e) => setNewGoal({ ...newGoal, duePeriod: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  >
                    <option value="14 Days">14 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="Semester End">Semester End</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20"
                  >
                    {saving ? 'Creating...' : 'Create Goal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
