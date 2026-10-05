// client/src/pages/MentorPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Zap, 
  ShieldAlert, 
  Layers, 
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export const MentorPage = () => {
  const { studentData, openQuiz } = useGrowth();
  const { activePersonaId } = useAuth();

  const [messages, setMessages] = useState([
    {
      sender: 'mentor',
      text: activePersonaId === 'student-tharun'
        ? `Hello **Tharun**! 👋 I am your dedicated Growth Mentor. I am constantly tracking your **+28% Growth Momentum** and error patterns. Today, our primary target is **Functions (48% mastery)** to eliminate pass-by-value mistakes. What would you like guidance on?`
        : activePersonaId === 'student-aadhya'
        ? `Hello **Aadhya**! 👑 As an elite **Top Performer (92% Score)**, you have mastered the core syllabus. I recommend diving into **Advanced Graph Algorithms** or starting the **Route Optimization Project**. What area would you like to explore?`
        : `Hello! 👋 I am your AI Growth Mentor. How can I assist your learning journey today?`,
      suggestedActions: activePersonaId === 'student-tharun'
        ? ['What should I study today?', 'What should I NOT study now?', 'Why am I losing marks?', 'Why did my score change?']
        : ['What should I study next?', 'Show Beyond Syllabus Projects', 'Research Opportunities']
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: 'mentor',
        text: activePersonaId === 'student-tharun'
          ? `Hello **Tharun**! 👋 I am your dedicated Growth Mentor. I am constantly tracking your **+28% Growth Momentum** and error patterns. Today, our primary target is **Functions (48% mastery)** to eliminate pass-by-value mistakes. What would you like guidance on?`
          : activePersonaId === 'student-aadhya'
          ? `Hello **Aadhya**! 👑 As an elite **Top Performer (92% Score)**, you have mastered the core syllabus. I recommend diving into **Advanced Graph Algorithms** or starting the **Route Optimization Project**. What area would you like to explore?`
          : `Hello! 👋 I am your AI Growth Mentor. How can I assist your learning journey today?`,
        suggestedActions: activePersonaId === 'student-tharun'
          ? ['What should I study today?', 'What should I NOT study now?', 'Why am I losing marks?', 'Why did my score change?']
          : ['What should I study next?', 'Show Beyond Syllabus Projects', 'Research Opportunities']
      }
    ]);
  }, [activePersonaId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (msgToSend = null) => {
    const text = msgToSend || inputText;
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    if (!msgToSend) setInputText('');
    setLoading(true);

    const res = await api.sendMentorMessage(studentData?.id || activePersonaId, text);
    
    if (res && res.success) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: res.reply,
          suggestedActions: res.suggestedActions || []
        }
      ]);
    } else {
      // Fallback
      let reply = '';
      let actions = [];
      const lower = text.toLowerCase();

      if (activePersonaId === 'student-tharun') {
        if (lower.includes('not study') || lower.includes('priority')) {
          reply = `⚠️ **Smart Learning Priority Alert**: You should **NOT** jump directly into **Advanced AI** right now. Your current prerequisite foundations in **Functions (${studentData?.topics?.[0]?.mastery || 48}%)** and **Arrays (${studentData?.topics?.[1]?.mastery || 52}%)** are still developing. Strengthening these core building blocks first will make AI and algorithms 10x easier later!`;
          actions = ['Start Functions Drill (3 Qs)', 'View Recovery Plan'];
        } else if (lower.includes('why') && (lower.includes('score') || lower.includes('change') || lower.includes('losing'))) {
          reply = `📈 **Why your score increased (+28% momentum)**: You've maintained a **7-day streak**, eliminated variable mistakes (88% mastery), and your upward trajectory proves exceptional resilience. You are classified as a **Late Bloomer – High Growth Potential**!`;
          actions = ['View Growth Fingerprint', 'Practice Functions'];
        } else {
          reply = `🎯 **Your Highest Priority Mission Today**: Focus on **Functions**. You are currently at **48% mastery** with repeated mistakes in parameter passing. Spend 20 minutes practicing the 3 parameter-passing drill questions to unlock Step 3!`;
          actions = ['Start Functions Drill (3 Qs)', 'What should I NOT study now?'];
        }
      } else {
        reply = `🚀 **Beyond the Syllabus Recommendation**: You have consistently maintained **${studentData?.currentScore || 92}%+ accuracy** across all core modules. I recommend bypassing basic revision and tackling **Advanced Graph Algorithms (Dijkstra/Tarjan)** and building the **High-Throughput Route Optimization Project**!`;
        actions = ['Launch Route Optimization Project', 'Explore Research Paper'];
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: reply,
          suggestedActions: actions
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Mentor Title Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span>AI Growth Mentor Workspace</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Online
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Contextual intelligence adapted to {studentData?.name}'s growth DNA ({studentData?.fingerprint?.title || 'Late Bloomer'})
              </p>
            </div>
          </div>

          <button
            onClick={() => openQuiz('Functions')}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-transform hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Launch Quick Practice Drill</span>
          </button>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[650px] overflow-hidden">
          
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => {
              const isMentor = msg.sender === 'mentor';

              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${isMentor ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isMentor && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`space-y-2 max-w-[85%] ${isMentor ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMentor
                          ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                          : 'bg-emerald-600 text-white font-medium rounded-br-none shadow-xs'
                      }`}
                    >
                      <div 
                        className="space-y-2 whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>

                    {/* Action Chips */}
                    {isMentor && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => {
                              if (action.includes('Quiz') || action.includes('Drill') || action.includes('Functions')) {
                                openQuiz('Functions');
                              } else {
                                handleSendMessage(action);
                              }
                            }}
                            className="text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{action}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isMentor && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mb-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>AI Mentor generating pedagogical insights...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask mentor (e.g. What should I NOT study now? What is pass-by-value?)..."
                className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
