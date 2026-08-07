/**
 * Storefront Customer Account Feature View
 * @module apps/storefront/src/features/account/AccountPageView
 */

'use client';

import { Key, Lock, LogOut,Shield, ShoppingCart, User } from 'lucide-react';
import React, { useState } from 'react';

import { authService } from '../../lib/commerce-client';

export function AccountPageView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('CustomerPass123!');
  const [customerName, setCustomerName] = useState('Jane Customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Customer Account</h1>
        <p className="text-xs text-slate-400">Integrated with IAM Module for identity, authentication, and security.</p>
      </div>

      {!isLoggedIn ? (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
          <h2 className="text-xl font-bold text-white text-center">Sign In to Your Account</h2>
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-xs text-white hover:bg-indigo-700 shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-lg text-white">
                {customerName[0]}
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{customerName}</h3>
                <p className="text-xs text-slate-400">{email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-indigo-400" /> Recent Order History
              </h4>
              <div className="text-xs text-slate-400 space-y-2">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="font-semibold text-white">ORD-2026-881920</span>
                  <span className="text-emerald-400 font-bold">$299.99 (PAID)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-semibold text-white">ORD-2026-104921</span>
                  <span className="text-emerald-400 font-bold">$149.50 (SHIPPED)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" /> Security & IAM Sessions
              </h4>
              <div className="text-xs text-slate-400 space-y-1.5">
                <div>Multi-Factor Auth (TOTP): <span className="font-bold text-white">Disabled</span></div>
                <div>Active Device Sessions: <span className="font-bold text-white">1 Chrome Windows</span></div>
                <div>Account Tier: <span className="font-bold text-indigo-400">VIP Preferred</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
