'use client';

import { AlertOctagon, HelpCircle, RefreshCw, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function OrderFailure({
  reason = 'Transaction declined by issuer bank (3D Secure validation timeout).',
  onRetry,
}: {
  reason?: string | undefined;
  onRetry?: (() => void) | undefined;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in">
      <div className="w-24 h-24 rounded-full bg-rose-500/10 border-2 border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
        <AlertOctagon className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Payment Failed</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-white">Transaction Unsuccessful</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">{reason}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {onRetry ? (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Payment</span>
          </button>
        ) : (
          <Link
            href="/checkout/payment"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Payment</span>
          </Link>
        )}

        <Link
          href="/checkout/payment"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
        >
          Change Payment Method
        </Link>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
        <HelpCircle className="w-4 h-4 text-amber-400" />
        <span>Need help? Contact SynoCommerce Concierge Support (24/7)</span>
      </div>
    </div>
  );
}
