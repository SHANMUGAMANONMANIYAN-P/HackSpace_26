// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogIn, AlertCircle, Sparkles, Lock, Mail, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, switchPersona } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await login(email, password);
      if (res && res.success) {
        if (res.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (res.user.role === 'FACULTY') {
          navigate('/faculty');
        } else if (res.user.isOnboarded === false) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPersona = async (personaId) => {
    try {
      setLoading(true);
      setError('');
      const switchedUser = await switchPersona(personaId);
      if (switchedUser) {
        if (switchedUser.role === 'ADMIN') {
          navigate('/admin');
        } else if (switchedUser.role === 'FACULTY') {
          navigate('/faculty');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('Could not switch demo persona.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
            <Sprout className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h2 className="font-display text-3xl font-black text-slate-900 tracking-tight">
            Welcome to Growth<span className="text-emerald-600">Mind</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            “Not Just a Score. A Growth Journey.”
          </p>
        </div>

        {/* 1-Click Judge Quick Login Personas */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              1-Click Judge Presets:
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Instant Authentication</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickPersona('usr-tharun')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-left transition-all border border-slate-700 hover:border-emerald-500 group"
            >
              <span className="font-bold text-white block truncate group-hover:text-white">🌱 Tharun</span>
              <span className="text-[10px] text-emerald-400 block truncate group-hover:text-emerald-100">Late Bloomer (+28%)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickPersona('usr-aadhya')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-purple-600 text-left transition-all border border-slate-700 hover:border-purple-500 group"
            >
              <span className="font-bold text-white block truncate group-hover:text-white">👑 Aadhya</span>
              <span className="text-[10px] text-purple-400 block truncate group-hover:text-purple-100">Top Performer (92%)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickPersona('usr-sharma')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-left transition-all border border-slate-700 hover:border-indigo-500 group"
            >
              <span className="font-bold text-white block truncate group-hover:text-white">🎓 Prof. Sharma</span>
              <span className="text-[10px] text-indigo-300 block truncate group-hover:text-indigo-100">Faculty Command</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickPersona('usr-admin')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left transition-all border border-slate-700 group"
            >
              <span className="font-bold text-white block truncate">🛡 System Admin</span>
              <span className="text-[10px] text-slate-400 block truncate">Platform Admin</span>
            </button>
          </div>
        </div>

        {/* Real Sign In Form */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. tharun.growth@mind.edu"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-semibold text-emerald-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In to GrowthMind'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-emerald-700 font-extrabold hover:underline">
              Create Student Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
