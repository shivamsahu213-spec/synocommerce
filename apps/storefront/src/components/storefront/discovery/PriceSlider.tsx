'use client';

import React from 'react';

export function PriceSlider({
  minPrice,
  maxPrice,
  priceRange,
  onChangePriceRange,
}: {
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onChangePriceRange: (range: [number, number]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-400">
        <span>Price Range</span>
        <span className="text-emerald-400 font-serif">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>

      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={priceRange[1]}
        onChange={(e) => onChangePriceRange([priceRange[0]!, Number(e.target.value)])}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />

      <div className="flex items-center gap-2 text-xs">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-center">
          <span className="text-slate-400 text-[10px] block">Min Price</span>
          <span className="font-bold text-white">${priceRange[0]}</span>
        </div>
        <span className="text-slate-600">-</span>
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-center">
          <span className="text-slate-400 text-[10px] block">Max Price</span>
          <span className="font-bold text-white">${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
