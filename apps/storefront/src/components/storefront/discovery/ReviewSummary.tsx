'use client';

import { Star } from 'lucide-react';
import React from 'react';

export function ReviewSummary({
  avgRating,
  totalReviews,
}: {
  avgRating: number;
  totalReviews: number;
}) {
  const distribution = [
    { stars: 5, pct: 85 },
    { stars: 4, pct: 10 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
      <h3 className="font-serif font-bold text-xl text-white">Customer Reviews</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div className="text-center sm:text-left space-y-1">
          <span className="font-serif text-5xl font-bold text-white block">{avgRating.toFixed(1)}</span>
          <div className="flex justify-center sm:justify-start text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-400 block">Based on {totalReviews} verified ratings</span>
        </div>

        <div className="sm:col-span-2 space-y-2">
          {distribution.map((d, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-slate-400 font-medium">{d.stars} Stars</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="w-8 text-right font-bold text-slate-300">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
