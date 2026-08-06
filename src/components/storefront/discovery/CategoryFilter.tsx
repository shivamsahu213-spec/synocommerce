'use client';

import React from 'react';

export interface CategoryOption {
  id: string;
  name: string;
  count: number;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Category Taxonomy</h4>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-all ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <span>All Categories</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span>{cat.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
