'use client';

import { ArrowRight, Clock, Flame } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-600 via-indigo-950 to-slate-950 p-8 md:p-12 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-widest">
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>24-Hour Flash Clearance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Up to 50% Off Luxury Ayurvedic & Tech Bundles
          </h2>

          <p className="text-sm text-slate-300">
            Exclusive discounts on Bhilai Saffron Kumkumadi, Studio Acoustic Headphones, and Mulberry Handlooms.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              href="/deals"
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Unlock Flash Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 text-center space-y-3 min-w-[280px]">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Ends In</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-center min-w-[54px]">
              <span className="font-serif font-bold text-2xl text-white block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Hours</span>
            </div>
            <span className="text-xl font-bold text-amber-400">:</span>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-center min-w-[54px]">
              <span className="font-serif font-bold text-2xl text-white block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Mins</span>
            </div>
            <span className="text-xl font-bold text-amber-400">:</span>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-center min-w-[54px]">
              <span className="font-serif font-bold text-2xl text-amber-400 block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
