// client/src/pages/AssessmentPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useGrowth } from '../context/GrowthContext';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  Award, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  Layers,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const SUBJECTS = ['All', 'C', 'C++', 'Python', 'Java', 'SQL', 'Data Structures'];

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [loading, setLoading] = useState(true);

  // Active Assessment State
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const { refreshData, triggerCelebration } = useGrowth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const res = await api.getAssessments();
      if (res && res.success) {
        setAssessments(res.assessments || []);
      }
    } catch (err) {
      console.error('Error fetching assessments:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async (asmId) => {
    try {
      const res = await api.getAssessmentById(asmId);
      if (res && res.success) {
        setActiveAssessment(res.assessment);
        setCurrentQIndex(0);
        setSelectedAnswers({});
        setQuizResult(null);
        setTimeLeft(res.assessment.questions.length * 90); // 90s per question
      }
    } catch (err) {
      console.error('Failed to start assessment:', err.message);
    }
  };

  // Timer Countdown
  useEffect(() => {
    if (!activeAssessment || quizResult) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAssessment, quizResult]);

  const handleSelectOption = (questionId, optionIndex) => {
    if (quizResult) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeAssessment || isSubmitting) return;
    setIsSubmitting(true);

    const answersPayload = activeAssessment.questions.map(q => ({
      questionId: q.id,
      selectedIndex: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
    }));

    try {
      const res = await api.submitAssessment(activeAssessment.id, answersPayload);
      if (res && res.success) {
        setQuizResult(res);
        triggerCelebration();
        if (refreshData) await refreshData();
      }
    } catch (err) {
      console.error('Error submitting assessment:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAssessments = assessments.filter(a => {
    const matchesSubject = selectedSubject === 'All' || a.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || a.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSubject && matchesDiff;
  });

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* If Active Assessment is running */}
        {activeAssessment ? (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Top Assessment Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-200">
                  <span>{activeAssessment.subject}</span>
                  <span>•</span>
                  <span>{activeAssessment.difficulty}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {activeAssessment.title}
                </h1>
              </div>

              {!quizResult && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-2xs">
                    <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                    <span>Time Left: {formatTime(timeLeft)}</span>
                  </div>
                  <button
                    onClick={() => setActiveAssessment(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100"
                  >
                    Exit Drill
                  </button>
                </div>
              )}
            </div>

            {/* If Quiz Result is ready */}
            {quizResult ? (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Result Hero Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Assessment Result & Growth Impact
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display">
                      Score: {quizResult.quizResult.scorePercent}%
                    </h2>
                    <p className="text-xs text-slate-300">
                      {quizResult.dynamicPathMessage}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-800/80 border border-emerald-400/40 p-3 rounded-2xl text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Earned XP</p>
                      <p className="text-lg font-black text-amber-400">+{quizResult.quizResult.xpEarned} XP</p>
                    </div>
                    <div className="bg-slate-800/80 border border-emerald-400/40 p-3 rounded-2xl text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Correct</p>
                      <p className="text-lg font-black text-emerald-400">
                        {quizResult.quizResult.correctCount} / {quizResult.quizResult.totalQuestions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Questions Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Detailed Explanations & Error Analysis
                  </h3>

                  {quizResult.quizResult.detailedResults.map((res, idx) => (
                    <div
                      key={res.questionId}
                      className={`p-5 rounded-2xl border ${
                        res.isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      } space-y-3`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{res.question}</span>
                        </div>
                        {res.isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full shrink-0">
                            <XCircle className="w-3.5 h-3.5" /> Mistake Detected
                          </span>
                        )}
                      </div>

                      {res.codeSnippet && (
                        <pre className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl overflow-x-auto">
                          <code>{res.codeSnippet}</code>
                        </pre>
                      )}

                      <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        <p className="font-bold text-slate-900">💡 Why?</p>
                        <p className="leading-relaxed text-slate-600">{res.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleStartQuiz(activeAssessment.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Drill</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveAssessment(null);
                      navigate('/learning-path');
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                  >
                    <span>View Updated Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Active Question View */
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                
                {/* Question Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Question {currentQIndex + 1} of {activeAssessment.questions.length}</span>
                    <span>{Math.round(((currentQIndex + 1) / activeAssessment.questions.length) * 100)}% Completed</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / activeAssessment.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = activeAssessment.questions[currentQIndex];
                  return (
                    <div className="space-y-5">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {q.question}
                      </h2>

                      {q.codeSnippet && (
                        <pre className="p-4 bg-slate-900 text-emerald-300 font-mono text-xs rounded-2xl overflow-x-auto shadow-inner">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      )}

                      {/* Options List */}
                      <div className="space-y-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${
                                  isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 text-slate-600 border-slate-300'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQIndex < activeAssessment.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={isSubmitting}
                        className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        <span>{isSubmitting ? 'Evaluating...' : 'Submit Assessment'}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        ) : (
          /* Assessment Catalog List */
          <div className="space-y-8">
            
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real Diagnostic & Skill Drills</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                  Assessment & Practice Drills
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Take focused drills across 6 core technical subjects. Every attempt dynamically updates your Growth Fingerprint.
                </p>
              </div>
            </div>

            {/* Subject Filters */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {SUBJECTS.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    selectedSubject === sub
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Assessments Grid */}
            {loading ? (
              <div className="min-h-[40vh] flex items-center justify-center text-slate-500 text-xs">
                Loading Assessments Library...
              </div>
            ) : filteredAssessments.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-700 text-sm">No assessments match the selected filter</h3>
                <p className="text-xs text-slate-400">Try selecting a different subject or difficulty level.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssessments.map((asm) => (
                  <div
                    key={asm.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {asm.subject}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          asm.difficulty === 'Foundation' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          asm.difficulty === 'Intermediate' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {asm.difficulty}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors">
                        {asm.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1 font-medium">
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                          {asm.questionCount || 3} Questions
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          ~5 Mins
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartQuiz(asm.id)}
                      className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 group-hover:bg-emerald-600 group-hover:text-white"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Start Assessment Drill</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
