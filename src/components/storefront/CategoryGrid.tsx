'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function CategoryGrid() {
  const categories = [
    {
      name: 'Ayurvedic Wellness',
      count: '142 Products',
      icon: '🌿',
      tag: 'Bhilai Heritage',
      color: 'from-emerald-900/40 to-slate-900',
    },
    {
      name: 'High-Acoustic Audio',
      count: '88 Products',
      icon: '🎧',
      tag: 'Hi-Fi Lossless',
      color: 'from-indigo-900/40 to-slate-900',
    },
    {
      name: 'Luxury Apparel & Silk',
      count: '210 Products',
      icon: '👘',
      tag: 'Handloom',
      color: 'from-purple-900/40 to-slate-900',
    },
    {
      name: 'Smart Workstations',
      count: '64 Products',
      icon: '💻',
      tag: 'Minimalist',
      color: 'from-slate-800 to-slate-950',
    },
    {
      name: 'Aroma & Living',
      count: '95 Products',
      icon: '🕯️',
      tag: 'Organic Oils',
      color: 'from-amber-900/40 to-slate-900',
    },
    {
      name: 'Fine Timepieces',
      count: '42 Products',
      icon: '⌚',
      tag: 'Swiss Movement',
      color: 'from-cyan-900/40 to-slate-900',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-2">
            Explore Ecosystem
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Shop By Category Taxonomy</h2>
        </div>
        <Link
          href="/categories"
          className="text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-white transition-colors flex items-center gap-1 mt-4 md:mt-0"
        >
          <span>View All Categories</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href="/categories"
            className={`group relative rounded-3xl bg-gradient-to-br ${cat.color} border border-slate-800 p-8 hover:border-slate-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden hover:-translate-y-1 flex flex-col justify-between min-h-[220px]`}
          >
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs font-semibold">
                {cat.tag}
              </span>
              <div className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>{cat.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
              </h3>
              <span className="text-xs text-slate-400 mt-1 block">{cat.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
