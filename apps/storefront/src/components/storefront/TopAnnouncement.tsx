'use client';

import { Sparkles, Truck, X } from 'lucide-react';
import React, { useState } from 'react';

export function TopAnnouncement() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-slate-100 py-2.5 px-4 text-xs font-medium border-b border-indigo-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-indigo-300 font-semibold tracking-wide">
          <span className="inline-flex items-center gap-1 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-[11px] text-indigo-400">
            <Sparkles className="w-3 h-3" /> VIP Early Access
          </span>
          <span>Spring/Summer 2026 Drops Are Live</span>
        </div>

        <div className="flex items-center justify-center gap-3 mx-auto sm:mx-0 text-center">
          <Truck className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span>
            Complimentary Worldwide Express Shipping on Orders Above <strong className="text-white font-bold">$150</strong> (Code: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30">FREESHIP</code>)
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="hover:text-slate-200 cursor-pointer transition-colors">USD ($)</span>
          <span className="hover:text-slate-200 cursor-pointer transition-colors">English</span>
          <button
            onClick={() => setVisible(false)}
            className="p-1 text-slate-400 hover:text-slate-100 transition-colors rounded-full hover:bg-slate-800"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
