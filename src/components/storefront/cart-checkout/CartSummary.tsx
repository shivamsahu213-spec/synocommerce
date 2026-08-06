'use client';

import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function CartSummary({
  subtotal,
  discountAmount = 0,
  giftWrapFee = 0,
  taxAmount = 0,
  onProceedToCheckout,
}: {
  subtotal: number;
  discountAmount?: number | undefined;
  giftWrapFee?: number | undefined;
  taxAmount?: number | undefined;
  onProceedToCheckout?: (() => void) | undefined;
}) {
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + giftWrapFee + shippingFee + taxAmount);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="font-serif font-bold text-xl text-white">Order Summary</h3>
        <span className="text-xs text-slate-400 font-medium">USD ($)</span>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-slate-200">
            <Truck className="w-4 h-4 text-emerald-400" />
            {remainingForFreeShipping === 0
              ? 'Free Express Shipping Unlocked!'
              : `Add $${remainingForFreeShipping.toFixed(2)} for Free Shipping`}
          </span>
          <span className="text-[10px] font-bold text-emerald-400">
            {subtotal >= freeShippingThreshold ? '100%' : `${Math.round((subtotal / freeShippingThreshold) * 100)}%`}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Calculation Rows */}
      <div className="space-y-3 text-xs text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-400">Subtotal</span>
          <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Coupon Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {giftWrapFee > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-400">Gift Packaging</span>
            <span className="font-bold text-white">+${giftWrapFee.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-slate-400">Estimated Shipping</span>
          <span className="font-bold text-white">
            {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Estimated Taxes</span>
          <span className="font-bold text-white">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
          <span className="font-serif font-bold text-lg text-white">Total Payable</span>
          <span className="font-serif font-bold text-2xl text-emerald-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Action Button */}
      {onProceedToCheckout ? (
        <button
          onClick={onProceedToCheckout}
          className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          href="/checkout"
          className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Encrypted 256-Bit SSL Checkout Protection</span>
      </div>
    </div>
  );
}
