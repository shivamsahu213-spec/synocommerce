'use client';

import { ArrowUpDown } from 'lucide-react';
import React from 'react';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export function SortDropdown({
  currentSort,
  onSortChange,
}: {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-indigo-400 hidden sm:block" />
      <span className="text-xs text-slate-400 font-medium hidden sm:block">Sort By:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
      >
        <option value="featured">Featured Spotlight</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
}
