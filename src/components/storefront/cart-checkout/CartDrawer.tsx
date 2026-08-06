'use client';

import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { CartItem, CartItemType } from './CartItem';

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h3 className="font-serif font-bold text-lg text-white">Your Shopping Bag</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 py-6 max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="py-12 text-center space-y-3 text-slate-400">
                <span className="text-4xl block">🛍️</span>
                <p className="text-xs">Your shopping bag is currently empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-slate-400 font-medium">Bag Subtotal</span>
              <span className="font-serif font-bold text-xl text-emerald-400">${subtotal.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-xs font-bold text-center transition-all"
              >
                View Full Bag
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider text-center transition-all shadow-lg flex items-center justify-center gap-1"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// MiniCart re-export
export const MiniCart = CartDrawer;
