// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGrowth } from '../context/GrowthContext';
import { 
  Sprout, 
  Flame, 
  Sparkles, 
  Bot, 
  Layers, 
  GraduationCap, 
  Compass, 
  ChevronDown, 
  ShieldAlert,
  BarChart3,
  LogOut,
  User,
  ShieldCheck,
  Target,
  Menu,
  X,
  BookOpen,
  Trophy
} from 'lucide-react';

export const Navbar = () => {
  const { user, role, switchPersona, logout, allPersonas, activePersonaId, isAuthenticated } = useAuth();
  const { studentData } = useGrowth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getNavLinks = () => {
    if (role === 'ADMIN') {
      return [
        { name: 'Admin Console', path: '/admin', icon: ShieldCheck },
        { name: 'Faculty Command', path: '/faculty', icon: GraduationCap },
        { name: 'Student View', path: '/dashboard', icon: Compass },
        { name: 'Assessments', path: '/assessments', icon: BookOpen },
      ];
    }
    if (role === 'FACULTY') {
      return [
        { name: 'Faculty Command', path: '/faculty', icon: GraduationCap },
        { name: 'Growth Comparison', path: '/faculty#comparison', icon: BarChart3 },
        { name: 'Assessments', path: '/assessments', icon: BookOpen },
        { name: 'Cohort Analytics', path: '/faculty#analytics', icon: Layers },
      ];
    }
    return [
      { name: 'Dashboard', path: '/dashboard', icon: Compass },
      { name: 'Growth Fingerprint', path: '/growth', icon: Sparkles },
      { name: 'Roadmap & Priorities', path: '/learning-path', icon: Layers },
      { name: 'Assessments', path: '/assessments', icon: BookOpen },
      { name: 'Goals', path: '/goals', icon: Target },
      { name: 'Opportunities', path: '/opportunities', icon: Trophy },
      { name: 'AI Mentor', path: '/mentor', icon: Bot },
    ];
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[41px] z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 font-display">
                  Growth<span className="text-emerald-600">Mind</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-tight">
                  Not Just a Score. A Growth Journey.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Gamification Streak & XP (for student role) */}
            {role === 'STUDENT' && isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-semibold shadow-2xs">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
                  <span>{studentData?.streakDays || 7} Days</span>
                </div>

                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200/80 px-2.5 py-1 rounded-full text-xs font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{studentData?.totalXP?.toLocaleString() || '2,450'} XP</span>
                </div>
              </div>
            )}

            {/* Profile Dropdown or Auth Link */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 transition-all"
                >
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                  <div className="hidden md:block text-left text-xs leading-tight pr-1">
                    <p className="font-bold text-slate-800">{user?.name}</p>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">
                      {role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
                      <p className="text-xs text-slate-500">Signed in as ({role})</p>
                      <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile & Preferences</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 py-1 text-xs">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Quick Switch Persona (Demo):
                      </div>
                      {allPersonas.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => switchPersona(p.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-1.5 text-left hover:bg-slate-50 text-xs ${
                            activePersonaId === p.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <img src={p.avatar} alt={p.name} className="w-4 h-4 rounded-full object-cover" />
                            <span>{p.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{p.role}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-emerald-700 font-bold text-xs px-3 py-2 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
