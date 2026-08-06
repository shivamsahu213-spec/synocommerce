'use client';

import { Minus, Plus } from 'lucide-react';
import React from 'react';

export function QuantitySelector({
  quantity,
  onQuantityChange,
  maxStock = 99,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  maxStock?: number;
}) {
  const handleDecrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < maxStock) onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Quantity</span>
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-10 text-center font-bold text-xs text-white">{quantity}</span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= maxStock}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
