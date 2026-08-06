'use client';

import { CheckCircle2, Truck, Zap } from 'lucide-react';
import React from 'react';

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estDays: string;
  tag: string;
  iconName?: 'truck' | 'zap' | 'shield' | undefined;
}

export function ShippingMethodCard({
  options,
  selectedId,
  onSelect,
}: {
  options: ShippingOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
              isSelected
                ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                {opt.id === 'express' ? <Zap className="w-5 h-5 text-amber-400" /> : <Truck className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-sm text-white">{opt.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-bold border border-slate-700">
                    {opt.tag}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{opt.estDays}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-serif font-bold text-base text-emerald-400">
                {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
              </span>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
