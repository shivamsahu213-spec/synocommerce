'use client';

import { Star } from 'lucide-react';
import React from 'react';

export function RatingFilter({
  selectedRating,
  onSelectRating,
}: {
  selectedRating: number;
  onSelectRating: (rating: number) => void;
}) {
  const ratings = [4.5, 4.0, 3.5, 3.0];

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Customer Rating</h4>
      <div className="space-y-1.5">
        <button
          onClick={() => onSelectRating(0)}
          className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
            selectedRating === 0 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900'
          }`}
        >
          All Ratings
        </button>
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => onSelectRating(r)}
            className={`w-full flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedRating === r ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span>{r} ★ & Above</span>
          </button>
        ))}
      </div>
    </div>
  );
}
