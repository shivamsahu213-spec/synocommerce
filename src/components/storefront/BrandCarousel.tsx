'use client';

import React from 'react';

export function BrandCarousel() {
  const brands = [
    { name: 'Apple Store', emblem: '' },
    { name: 'Nike Sport', emblem: '⚡' },
    { name: 'Shopify Plus', emblem: '🛍️' },
    { name: 'Kalyan Ayurvedic', emblem: '🌿' },
    { name: 'Rolex Geneva', emblem: '👑' },
    { name: 'Sephora Paris', emblem: '✨' },
    { name: 'Aesop Botanicals', emblem: '🧪' },
    { name: 'Sony Acoustic', emblem: '🎧' },
  ];

  return (
    <section className="py-16 bg-slate-950 border-y border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Partnered With Global Luxury & Enterprise Brands
        </span>
      </div>

      <div className="flex items-center gap-12 overflow-x-auto scrollbar-none max-w-7xl mx-auto px-6 justify-between opacity-70 hover:opacity-100 transition-opacity">
        {brands.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-slate-300 font-serif font-bold text-lg hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span className="text-2xl">{b.emblem}</span>
            <span>{b.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
