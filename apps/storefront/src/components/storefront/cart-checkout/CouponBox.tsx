'use client';

import { Check, Tag } from 'lucide-react';
import React, { useState } from 'react';

export function CouponBox({
  onApplyCoupon,
  appliedCoupon,
}: {
  onApplyCoupon: (code: string, discountPct: number) => void;
  appliedCoupon?: string | undefined;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const validCoupons: Record<string, number> = {
    VIP15: 15,
    FREESHIP: 10,
    SUMMER2026: 20,
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const uppercase = code.trim().toUpperCase();
    if (validCoupons[uppercase]) {
      onApplyCoupon(uppercase, validCoupons[uppercase]!);
      setCode('');
    } else {
      setError('Invalid code. Try "VIP15" or "FREESHIP"');
    }
  };

  return (
    <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
        <Tag className="w-4 h-4 text-amber-400" />
        <span>Promo Code & Coupon</span>
      </div>

      {appliedCoupon ? (
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Coupon &quot;{appliedCoupon}&quot; Applied ({validCoupons[appliedCoupon] || 15}% OFF)</span>
          </div>
          <button
            onClick={() => onApplyCoupon('', 0)}
            className="text-[11px] text-slate-400 hover:text-white underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter promo code (e.g. VIP15)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Apply
          </button>
        </form>
      )}

      {error && <span className="text-[11px] text-rose-400 font-semibold block">{error}</span>}
    </div>
  );
}
