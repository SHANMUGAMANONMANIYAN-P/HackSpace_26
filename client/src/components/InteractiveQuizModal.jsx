// client/src/components/InteractiveQuizModal.jsx
import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  RotateCcw, 
  Award,
  ChevronRight,
  Code
} from 'lucide-react';

export const InteractiveQuizModal = () => {
  const { quizModal, closeQuiz, handleQuizSubmit } = useGrowth();
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  if (!quizModal.isOpen) return null;

  const questions = quizModal.questions || [];
  const currentQ = questions[currentQuestionIdx];
  const hasSelectedCurrent = currentQ && selectedAnswers[currentQ.id] !== undefined;
  const isLastQuestion = currentQuestionIdx === questions.length - 1;

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const answersPayload = questions.map(q => ({
      questionId: q.id,
      selectedIndex: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
    }));

    const result = await handleQuizSubmit(quizModal.topic, answersPayload);
    setQuizResult(result);
    setIsSubmitted(true);
    setSubmitting(false);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setQuizResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-emerald-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 fill-current text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display flex items-center gap-2">
                <span>{quizModal.topic} Live Growth Drill</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Dynamic Recalculator
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Answer correctly to immediately improve topic mastery & unlock next roadmap steps.
              </p>
            </div>
          </div>

          <button
            onClick={closeQuiz}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {!isSubmitted ? (
            questions.length > 0 && currentQ ? (
              <div className="space-y-4">
                
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                  <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
                  <span className="text-emerald-600 font-semibold">Difficulty: {currentQ.difficulty || 'Intermediate'}</span>
                </div>
                
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question text */}
                <div className="pt-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Code Snippet Box (if any) */}
                {currentQ.codeSnippet && (
                  <div className="bg-slate-900 text-emerald-400 rounded-xl p-3.5 font-mono text-xs border border-slate-800 shadow-inner overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{currentQ.codeSnippet}</pre>
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-sm">
                Loading questions for {quizModal.topic}...
              </div>
            )
          ) : (
            /* Result Screen */
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2 bg-gradient-to-b from-emerald-50/60 to-transparent p-6 rounded-2xl border border-emerald-100">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Award className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">
                  Growth Assessment Complete!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your performance data has been processed by the Growth Engine.
                </p>

                {/* Dynamic Delta Callout */}
                <div className="flex items-center justify-center gap-4 pt-3">
                  <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Previous Mastery</p>
                    <p className="text-base font-bold text-slate-600">{quizResult?.previousMastery || 48}%</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-500" />
                  <div className="bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-md text-center">
                    <p className="text-[10px] text-emerald-100 uppercase font-semibold">Updated Mastery</p>
                    <p className="text-base font-extrabold">{quizResult?.newMastery || 64}% ↑</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    +{quizResult?.xpEarned || 150} XP Awarded & Roadmaps Updated!
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Question Review & Explanations:
                </h5>
                {quizResult?.detailedResults?.map((res, i) => (
                  <div 
                    key={i} 
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      res.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      {res.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className="text-slate-800">Q{i + 1}: {res.question}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] pl-6 leading-relaxed">
                      <span className="font-semibold text-slate-700">Explanation:</span> {res.explanation}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {!isLastQuestion ? (
                  <button
                    onClick={handleNext}
                    disabled={!hasSelectedCurrent}
                    className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-xs"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!hasSelectedCurrent || submitting}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 hover:scale-105"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{submitting ? 'Recalculating...' : 'Submit Drill & Update Path'}</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold px-3 py-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Drill
              </button>
              <button
                onClick={closeQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md transition-all"
              >
                View Updated Dashboard →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
