// client/src/components/AIMentorDrawer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  X, 
  MessageSquare, 
  HelpCircle, 
  Zap, 
  ShieldAlert,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AIMentorDrawer = ({ isOpen, onClose }) => {
  const { studentData, openQuiz } = useGrowth();
  const { activePersonaId } = useAuth();

  const [messages, setMessages] = useState([
    {
      sender: 'mentor',
      text: activePersonaId === 'student-tharun'
        ? `Hello **Tharun**! 👋 I am your Growth Mentor. Your learning trajectory shows **+28% Growth Momentum**. Let's tackle **Functions (48% mastery)** today so you can eliminate parameter-passing bugs and unlock Step 3 in your Recovery Roadmap. How can I guide your growth today?`
        : activePersonaId === 'student-aadhya'
        ? `Hello **Aadhya**! 👑 As an elite **Top Performer (92% Score)**, your roadmap is configured for **Beyond the Syllabus** exploration. Ready to tackle Advanced Graph Algorithms and the Route Optimization Project?`
        : `Hello! 👋 I am your AI Growth Mentor. How can I assist your learning journey today?`,
      suggestedActions: activePersonaId === 'student-tharun'
        ? ['What should I study today?', 'What should I NOT study now?', 'Why am I losing marks?']
        : ['What should I study next?', 'Show Beyond Syllabus Projects', 'Why did my score change?']
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Reset initial message when persona switches
    setMessages([
      {
        sender: 'mentor',
        text: activePersonaId === 'student-tharun'
          ? `Hello **Tharun**! 👋 I am your Growth Mentor. Your learning trajectory shows **+28% Growth Momentum**. Let's tackle **Functions (48% mastery)** today so you can eliminate parameter-passing bugs and unlock Step 3 in your Recovery Roadmap. How can I guide your growth today?`
          : activePersonaId === 'student-aadhya'
          ? `Hello **Aadhya**! 👑 As an elite **Top Performer (92% Score)**, your roadmap is configured for **Beyond the Syllabus** exploration. Ready to tackle Advanced Graph Algorithms and the Route Optimization Project?`
          : `Hello! 👋 I am your AI Growth Mentor. How can I assist your learning journey today?`,
        suggestedActions: activePersonaId === 'student-tharun'
          ? ['What should I study today?', 'What should I NOT study now?', 'Why am I losing marks?']
          : ['What should I study next?', 'Show Beyond Syllabus Projects', 'Why did my score change?']
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
      // Fallback AI Mentor logic
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Drawer Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-emerald-50/40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
              <span>GrowthMind AI Mentor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Personalized for {studentData?.name || 'Student'} ({studentData?.fingerprint?.title || 'Growth Mode'})
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => {
          const isMentor = msg.sender === 'mentor';

          return (
            <div
              key={idx}
              className={`flex gap-2.5 ${isMentor ? 'items-start' : 'items-end justify-end'}`}
            >
              {isMentor && (
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-2 max-w-[85%] ${isMentor ? 'text-left' : 'text-right'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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

                {/* Suggested Action Chips */}
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
                        className="text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isMentor && (
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mb-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-9">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <span>AI Mentor analyzing growth DNA...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask mentor (e.g. What should I NOT study now?)...`}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2.5 rounded-xl shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
