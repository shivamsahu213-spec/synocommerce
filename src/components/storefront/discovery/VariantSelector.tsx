'use client';

import React from 'react';

export interface VariantOption {
  type: string;
  name: string;
  options: string[];
}

export function VariantSelector({
  variants,
  selectedVariants,
  onSelectVariant,
}: {
  variants: VariantOption[];
  selectedVariants: Record<string, string>;
  onSelectVariant: (type: string, val: string) => void;
}) {
  return (
    <div className="space-y-4">
      {variants.map((v, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
            <span>Select {v.name}</span>
            <span className="text-amber-400 font-serif">{selectedVariants[v.type] || v.options[0]}</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {v.options.map((opt, oIdx) => {
              const isSelected = (selectedVariants[v.type] || v.options[0]) === opt;
              return (
                <button
                  key={oIdx}
                  onClick={() => onSelectVariant(v.type, opt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
