'use client';

import { ShoppingBag } from 'lucide-react';
import React from 'react';

import { CartItemType } from './CartItem';

export function OrderSummary({
  items,
  shippingFee = 0,
  discountAmount = 0,
  taxAmount = 0,
}: {
  items: CartItemType[];
  shippingFee?: number | undefined;
  discountAmount?: number | undefined;
  taxAmount?: number | undefined;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-400" />
          <h3 className="font-serif font-bold text-lg text-white">Order Summary</h3>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
          {items.length} items
        </span>
      </div>

      {/* Item Previews */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-lg">
                {item.emoji}
              </span>
              <div>
                <h5 className="font-serif font-bold text-white max-w-[140px] truncate">{item.name}</h5>
                <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
              </div>
            </div>
            <span className="font-bold text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Row Totals */}
      <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">Items Subtotal</span>
          <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Coupon Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-slate-400">Shipping</span>
          <span className="font-bold text-white">
            {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Estimated Taxes</span>
          <span className="font-bold text-white">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
          <span className="font-serif font-bold text-base text-white">Total Amount</span>
          <span className="font-serif font-bold text-2xl text-emerald-400">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
