'use client';

import { CheckCircle2, Star, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
}

export function ReviewList({ reviews }: { reviews: ReviewItem[] }) {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, current: number) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || current) + 1 }));
  };

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div key={rev.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-white">{rev.author}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Verified Purchaser
              </span>
            </div>
            <span className="text-xs text-slate-500">{rev.date}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: rev.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>

          <h4 className="font-serif font-bold text-sm text-white">{rev.title}</h4>
          <p className="text-xs text-slate-300 font-light leading-relaxed">{rev.comment}</p>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Location: {rev.location}</span>
            <button
              onClick={() => handleLike(rev.id, rev.helpfulCount)}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Helpful ({likes[rev.id] || rev.helpfulCount})</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
