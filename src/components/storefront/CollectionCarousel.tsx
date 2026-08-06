'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';

export function CollectionCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const collections = [
    {
      title: 'Spring / Summer 2026',
      desc: 'Lightweight linen, pure Kumkumadi oils, and seasonal aromatics.',
      items: '24 Curated Items',
      badge: 'New Season',
      bg: 'from-amber-950/60 to-slate-900',
    },
    {
      title: 'Minimalist Tech Edit',
      desc: 'Lossless audio, ergonomic stands, and carbon neutral materials.',
      items: '18 Curated Items',
      badge: 'Trending',
      bg: 'from-indigo-950/60 to-slate-900',
    },
    {
      title: 'Bhilai Ayurvedic Reserve',
      desc: 'Authentic 1984 formulations direct from Chhattisgarh botanical gardens.',
      items: '14 Curated Items',
      badge: 'Heritage Collection',
      bg: 'from-emerald-950/60 to-slate-900',
    },
    {
      title: 'Mulberry Silk Craft',
      desc: 'Hand-loomed silk sarees and artisanal loungewear.',
      items: '32 Curated Items',
      badge: 'Limited Run',
      bg: 'from-purple-950/60 to-slate-900',
    },
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 block mb-2">
            Curated Showcases
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Featured Collections</h2>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => handleScroll('left')}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {collections.map((col, idx) => (
          <div
            key={idx}
            className={`min-w-[320px] sm:min-w-[380px] snap-start rounded-3xl bg-gradient-to-br ${col.bg} border border-slate-800 p-8 shadow-xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all`}
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/50 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> {col.badge}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">{col.desc}</p>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs text-slate-400">{col.items}</span>
              <Link
                href="/collections"
                className="px-4 py-2 rounded-full bg-slate-900 border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
