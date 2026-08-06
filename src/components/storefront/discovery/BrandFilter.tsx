'use client';

import React from 'react';

export function BrandFilter({
  brands,
  selectedBrands,
  onToggleBrand,
}: {
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Partner Brands</h4>
      <div className="space-y-2">
        {brands.map((b, idx) => {
          const isSelected = selectedBrands.includes(b);
          return (
            <label
              key={idx}
              className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleBrand(b)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span>{b}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
