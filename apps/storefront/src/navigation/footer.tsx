/**
 * Storefront Footer Component
 * @module apps/storefront/src/navigation/footer
 */

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-white">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <span>SynoStore</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Enterprise headless commerce storefront powered by SynoCommerce Framework.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Shop Categories</h4>
            <ul className="space-y-1.5">
              <li><Link href="/products?category=Audio" className="hover:text-white">Audio & Sound</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-white">Computer Accessories</Link></li>
              <li><Link href="/products?category=Furniture" className="hover:text-white">Ergonomic Furniture</Link></li>
              <li><Link href="/products?category=Monitors" className="hover:text-white">UltraHD Monitors</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Customer Care</h4>
            <ul className="space-y-1.5">
              <li><Link href="/account" className="hover:text-white">Account Overview</Link></li>
              <li><Link href="/cart" className="hover:text-white">View Shopping Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-white">Checkout Express</Link></li>
              <li><span className="hover:text-white cursor-pointer">Track Orders</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Newsletter</h4>
            <p>Subscribe to receive exclusive store offers and product releases.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-900 pt-6 text-center text-slate-500">
          © 2026 SynoStack Technologies. SynoCommerce Storefront Framework. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
