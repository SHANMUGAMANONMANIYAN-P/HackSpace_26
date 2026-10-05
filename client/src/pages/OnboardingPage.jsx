// client/src/pages/OnboardingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGrowth } from '../context/GrowthContext';
import { api } from '../services/api';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Target, 
  Zap,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';

export const OnboardingPage = () => {
  const { user, setUser } = useAuth();
  const { triggerCelebration } = useGrowth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('Year 1');
  const [semester, setSemester] = useState('Semester 1');
  const [selectedSubjects, setSelectedSubjects] = useState(['C Programming', 'Data Structures']);
  const [goals, setGoals] = useState('Master Core Programming & Algorithms');

  // Diagnostic Quiz State
  const diagnosticQuestions = [
    {
      id: 'q-init-1',
      question: 'Which of the following data types in C typically occupies 4 bytes of memory on a 64-bit architecture?',
      options: ['char (1 byte)', 'int (4 bytes)', 'double (8 bytes)', 'short (2 bytes)'],
      correctIndex: 1
    },
    {
      id: 'q-init-2',
      question: 'How many times will a standard loop `for(int i = 0; i < 5; i++)` iterate?',
      options: ['4 times', '5 times (0, 1, 2, 3, 4)', '6 times', 'Indefinitely'],
      correctIndex: 1
    },
    {
      id: 'q-init-3',
      question: 'When an array is passed as an argument to a function in C, what is actually received by the parameter?',
      options: ['A full copy of every element in the array', 'The base memory address (pointer) to the first element', 'A reference object as in Python/Java', 'Arrays cannot be passed to functions'],
      correctIndex: 1
    }
  ];

  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});

  const toggleSubject = (sub) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleDiagnosticSelect = (qIdx, optIdx) => {
    setDiagnosticAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleFinishOnboarding = async () => {
    setSubmitting(true);
    const answersArray = [
      diagnosticAnswers[0] !== undefined ? diagnosticAnswers[0] : -1,
      diagnosticAnswers[1] !== undefined ? diagnosticAnswers[1] : -1,
      diagnosticAnswers[2] !== undefined ? diagnosticAnswers[2] : -1,
    ];

    try {
      const res = await api.completeOnboarding({
        department,
        year,
        semester,
        subjects: selectedSubjects,
        goals,
        diagnosticAnswers: answersArray
      });

      if (res && res.success) {
        triggerCelebration();
        if (user) {
          setUser({ ...user, isOnboarded: true });
        }
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Onboarding submit error:', err.message);
      navigate('/dashboard');
    }
    setSubmitting(false);
  };

  const availableSubjects = [
    'C Programming', 'Data Structures', 'Python Basics', 'Algorithms', 'Operating Systems', 'DBMS', 'Web Development', 'Machine Learning'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-emerald-600 text-white items-center justify-center shadow-md shadow-emerald-600/20 animate-pulse">
            <Sprout className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-display">
            Welcome to Growth<span className="text-emerald-600">Mind</span>!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Let's synthesize your personalized Growth DNA in 3 quick steps.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-8 bg-emerald-600'
                    : step > s
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          
          {/* STEP 1: Academic Profile */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Step 1 of 3
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                  Confirm Your Academic Department & Cohort
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Department / Branch</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Academic Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Year 1">Year 1 (Freshman)</option>
                      <option value="Year 2">Year 2 (Sophomore)</option>
                      <option value="Year 3">Year 3 (Junior)</option>
                      <option value="Year 4">Year 4 (Senior)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
                >
                  <span>Continue to Subjects</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Subject & Goal Selection */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Step 2 of 3
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                  Select Your Priority Subjects & Learning Target
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Target Focus Modules (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSubjects.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub);
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleSubject(sub)}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500/20'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{sub}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Primary Growth Goal</label>
                  <input
                    type="text"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g. Master Data Structures and secure Tech Internship"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-500 hover:text-slate-900 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
                >
                  <span>Proceed to Diagnostic Drill</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Baseline Diagnostic Assessment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Step 3 of 3 • Quick Baseline Drill
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 font-display">
                  3-Question Diagnostic Assessment
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Helps the AI engine establish your baseline trajectory without penalty.
                </p>
              </div>

              <div className="space-y-5">
                {diagnosticQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <p className="text-xs font-bold text-slate-900">
                      Q{qIdx + 1}: {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = diagnosticAnswers[qIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleDiagnosticSelect(qIdx, oIdx)}
                            className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center gap-2 ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="truncate">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-500 hover:text-slate-900 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleFinishOnboarding}
                  disabled={submitting}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{submitting ? 'Synthesizing Growth DNA...' : 'Generate My Growth Fingerprint →'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
