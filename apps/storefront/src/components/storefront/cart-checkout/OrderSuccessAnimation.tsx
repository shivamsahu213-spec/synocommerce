'use client';

import { CheckCircle2, Download, PackageCheck, Sparkles, Truck } from 'lucide-react';
import React from 'react';

export function OrderSuccessAnimation({
  orderId = 'SYN-2026-8842',
  estimatedDelivery = 'Saturday, Aug 8',
}: {
  orderId?: string | undefined;
  estimatedDelivery?: string | undefined;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Payment Verified & Confirmed</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-white">Order Confirmed!</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Thank you for choosing SynoCommerce Luxury. Order confirmation receipt has been sent to your email.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block text-left text-xs space-y-1">
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Order Reference:</span>
          <strong className="text-amber-400 font-mono">{orderId}</strong>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Estimated Delivery:</span>
          <strong className="text-emerald-400">{estimatedDelivery}</strong>
        </div>
      </div>

      {/* Order Progress Timeline */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Fulfillment Status</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold space-y-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
            <span className="block text-[11px]">Order Placed</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 font-bold space-y-1">
            <PackageCheck className="w-4 h-4 mx-auto" />
            <span className="block text-[11px]">Preparing Ship</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-bold space-y-1">
            <Truck className="w-4 h-4 mx-auto" />
            <span className="block text-[11px]">Out for Delivery</span>
          </div>
        </div>
      </div>

      <button className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 mx-auto border border-slate-700">
        <Download className="w-4 h-4 text-indigo-400" />
        <span>Download Official PDF Invoice</span>
      </button>
    </div>
  );
}
