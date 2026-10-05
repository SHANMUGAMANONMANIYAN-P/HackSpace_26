// client/src/context/GrowthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const GrowthContext = createContext();

export const GrowthProvider = ({ children }) => {
  const { user, role, isAuthenticated, activePersonaId } = useAuth();
  
  const [studentData, setStudentData] = useState(null);
  const [facultyData, setFacultyData] = useState(null);
  const [growthComparisonList, setGrowthComparisonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetNotStudyTopic, setTargetNotStudyTopic] = useState('Advanced AI');
  
  // Interactive Quiz Modal State
  const [quizModal, setQuizModal] = useState({
    isOpen: false,
    topic: 'Functions',
    questions: [],
    loading: false
  });

  const [notification, setNotification] = useState(null);

  // Trigger celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  };

  // Load student / faculty data whenever user, role, active persona or target topic changes
  const loadData = useCallback(async () => {
    if (!isAuthenticated) {
      setStudentData(null);
      setFacultyData(null);
      return;
    }

    setLoading(true);
    try {
      if (role === 'FACULTY') {
        const res = await api.getFacultyDashboard();
        if (res && res.success) {
          setFacultyData(res.faculty);
          setGrowthComparisonList(res.growthComparison || []);
        }
      } else {
        // Fetch personalized dashboard for authenticated student
        const res = await api.getStudentDashboard(targetNotStudyTopic);
        if (res && res.success && res.student) {
          setStudentData(res.student);
        }
      }
    } catch (err) {
      console.warn('Error loading growth dashboard data:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, role, activePersonaId, targetNotStudyTopic]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open Interactive Quiz Modal
  const openQuiz = async (topic = 'Functions') => {
    setQuizModal(prev => ({ ...prev, isOpen: true, topic, loading: true }));
    try {
      const res = await api.getQuizQuestions(topic);
      if (res && res.success && res.questions) {
        setQuizModal({
          isOpen: true,
          topic,
          questions: res.questions,
          loading: false
        });
      }
    } catch (err) {
      console.error('Failed to load quiz questions:', err.message);
      setQuizModal(prev => ({ ...prev, loading: false }));
    }
  };

  const closeQuiz = () => {
    setQuizModal(prev => ({ ...prev, isOpen: false }));
  };

  // Submit Interactive Quiz
  const handleQuizSubmit = async (topic, answers) => {
    if (!studentData?.id) return;
    try {
      const res = await api.submitQuiz(studentData.id, topic, answers);
      if (res && res.success) {
        await loadData();
        triggerCelebration();
        setNotification({
          type: 'success',
          title: '🎯 Dynamic Growth Recalculated!',
          message: res.dynamicPathMessage || `Topic mastery updated! Your learning path has dynamically shifted.`,
          xpEarned: res.quizResult?.xpEarned || 150
        });
        return res.quizResult;
      }
    } catch (err) {
      console.error('Quiz submit error:', err.message);
    }
  };

  const changeNotStudyTarget = (topic) => {
    setTargetNotStudyTopic(topic);
  };

  const resetDemo = async () => {
    await api.resetDemoDatabase();
    await loadData();
    setNotification({
      type: 'info',
      title: 'Demo Database Reset',
      message: 'All student metrics and test logs reset to baseline.'
    });
  };

  return (
    <GrowthContext.Provider
      value={{
        studentData,
        facultyData,
        growthComparisonList,
        loading,
        quizModal,
        notification,
        targetNotStudyTopic,
        openQuiz,
        closeQuiz,
        handleQuizSubmit,
        changeNotStudyTarget,
        setNotification,
        resetDemo,
        triggerCelebration,
        refreshData: loadData
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
};

export const useGrowth = () => useContext(GrowthContext);
