'use client';

import { Bookmark, Heart, Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

export interface CartItemType {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  emoji: string;
  variant?: string | undefined;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  onMoveToWishlist,
}: {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater?: ((id: string) => void) | undefined;
  onMoveToWishlist?: ((id: string) => void) | undefined;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-center justify-between gap-5 group">
      <div className="flex items-center gap-5 w-full sm:w-auto">
        <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform">
          {item.emoji}
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
            {item.category}
          </span>
          <h4 className="font-serif font-bold text-sm text-white">{item.name}</h4>
          {item.variant && <span className="text-xs text-slate-400 block font-medium">Variant: {item.variant}</span>}
          <span className="font-serif font-bold text-emerald-400 text-sm block sm:hidden">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center font-bold text-xs text-white">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <span className="font-serif font-bold text-emerald-400 text-base hidden sm:block">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {onMoveToWishlist && (
            <button
              onClick={() => onMoveToWishlist(item.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title="Move to Wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          )}
          {onSaveForLater && (
            <button
              onClick={() => onSaveForLater(item.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
              title="Save for Later"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Remove Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
