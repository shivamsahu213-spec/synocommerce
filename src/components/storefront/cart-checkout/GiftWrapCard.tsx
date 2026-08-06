'use client';

import { Gift } from 'lucide-react';
import React, { useState } from 'react';

export function GiftWrapCard({
  onToggleGiftWrap,
  enabled,
}: {
  onToggleGiftWrap: (enabled: boolean, message: string) => void;
  enabled: boolean;
}) {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggleGiftWrap(e.target.checked, message)}
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
          />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Add Luxury Gift Packaging (+$5.00)</span>
          </div>
        </label>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
          Bhilai Satin Ribbon
        </span>
      </div>

      {enabled && (
        <div className="pt-2 space-y-2 animate-in fade-in">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              onToggleGiftWrap(true, e.target.value);
            }}
            placeholder="Include personalized gift message..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}
    </div>
  );
}
