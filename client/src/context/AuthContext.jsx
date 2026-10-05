// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

const DEMO_PERSONAS_DEFAULT = [
  { id: 'usr-tharun', name: 'Tharun', role: 'STUDENT', classification: 'Late Bloomer – High Growth Potential', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', score: '75%', momentum: '+28%', badgeColor: 'emerald' },
  { id: 'usr-aadhya', name: 'Aadhya', role: 'STUDENT', classification: 'Top Performer – Beyond Syllabus', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', score: '92%', momentum: '+4%', badgeColor: 'purple' },
  { id: 'usr-rohan', name: 'Rohan', role: 'STUDENT', classification: 'Developing Learner – Steady Growth', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', score: '61%', momentum: '+12%', badgeColor: 'blue' },
  { id: 'usr-priya', name: 'Priya', role: 'STUDENT', classification: 'Consistent Learner – High Discipline', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', score: '78%', momentum: '+10%', badgeColor: 'cyan' },
  { id: 'usr-sharma', name: 'Prof. Sharma', role: 'FACULTY', classification: 'Faculty / Dept Head', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', score: 'Cohort: 64', momentum: 'Avg +13.8%', badgeColor: 'indigo' },
  { id: 'usr-admin', name: 'System Admin', role: 'ADMIN', classification: 'Platform Admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', score: 'Control', momentum: 'System', badgeColor: 'slate' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('growthmind_token') || null);
  const [activePersonaId, setActivePersonaId] = useState(() => localStorage.getItem('growthmind_persona') || null);
  const [loading, setLoading] = useState(true);
  const [allPersonas, setAllPersonas] = useState(DEMO_PERSONAS_DEFAULT);

  // Initialize session on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const savedToken = localStorage.getItem('growthmind_token');
      if (savedToken) {
        try {
          const res = await api.getMe();
          if (res && res.success && res.user) {
            setUser(res.user);
            setActivePersonaId(res.user.id);
          } else {
            // Invalid/expired token
            localStorage.removeItem('growthmind_token');
            localStorage.removeItem('growthmind_persona');
            setToken(null);
            setUser(null);
            setActivePersonaId(null);
          }
        } catch (e) {
          localStorage.removeItem('growthmind_token');
          localStorage.removeItem('growthmind_persona');
          setToken(null);
          setUser(null);
          setActivePersonaId(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const switchPersona = async (personaId) => {
    try {
      const res = await api.switchDemoPersona(personaId);
      if (res && res.success) {
        localStorage.setItem('growthmind_token', res.token);
        localStorage.setItem('growthmind_persona', res.user.id);
        setToken(res.token);
        setUser(res.user);
        setActivePersonaId(res.user.id);
        return res.user;
      }
    } catch (err) {
      console.warn('Demo switch error:', err.message);
    }
  };

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res && res.success) {
      localStorage.setItem('growthmind_token', res.token);
      localStorage.setItem('growthmind_persona', res.user.id);
      setToken(res.token);
      setUser(res.user);
      setActivePersonaId(res.user.id);
      return res;
    }
    throw new Error(res?.message || 'Login failed');
  };

  const register = async (formData) => {
    const res = await api.register(formData);
    if (res && res.success) {
      localStorage.setItem('growthmind_token', res.token);
      localStorage.setItem('growthmind_persona', res.user.id);
      setToken(res.token);
      setUser(res.user);
      setActivePersonaId(res.user.id);
      return res;
    }
    throw new Error(res?.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('growthmind_token');
    localStorage.removeItem('growthmind_persona');
    setToken(null);
    setUser(null);
    setActivePersonaId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        activePersonaId,
        allPersonas,
        isAuthenticated: !!user && !!token,
        loading,
        role: user?.role || 'STUDENT',
        isOnboarded: user?.isOnboarded !== false,
        switchPersona,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
