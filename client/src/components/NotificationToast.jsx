// client/src/components/NotificationToast.jsx
import React from 'react';
import { useGrowth } from '../context/GrowthContext';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export const NotificationToast = () => {
  const { notification, setNotification } = useGrowth();

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-emerald-500/40 animate-in slide-in-from-top duration-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="space-y-1 flex-1">
          <h5 className="font-bold text-sm text-emerald-400 font-display">
            {notification.title}
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            {notification.message}
          </p>
        </div>

        <button
          onClick={() => setNotification(null)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
