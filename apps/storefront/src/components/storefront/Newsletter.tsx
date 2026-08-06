'use client';

import { CheckCircle2, Mail, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 p-10 sm:p-16 border border-indigo-500/20 text-center shadow-2xl overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>VIP Insider Access</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Receive 15% Off Your First Luxury Order
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Subscribe to receive private lookbook drops, seasonal Ayurvedic wellness guides, and exclusive flash sale invitations.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 font-semibold text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Welcome to the VIP Club! Use Coupon Code VIP15 at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg whitespace-nowrap"
              >
                Join VIP Insider
              </button>
            </form>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium pt-4">
            <span>✓ Zero Spam</span>
            <span>✓ Unsubscribe Anytime</span>
            <span>✓ 100% Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
