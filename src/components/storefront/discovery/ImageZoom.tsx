'use client';

import { Maximize2, X } from 'lucide-react';
import React from 'react';

export function ImageZoom({
  emoji,
  isOpen,
  onClose,
}: {
  emoji: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="text-center space-y-6 max-w-lg">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-9xl shadow-2xl mx-auto animate-in zoom-in-95 duration-200">
          {emoji}
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
          <Maximize2 className="w-4 h-4" />
          <span>High Definition Product View</span>
        </div>
      </div>
    </div>
  );
}
