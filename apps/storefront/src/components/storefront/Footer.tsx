'use client';

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-slate-800/80 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center font-bold text-lg text-white">
                S
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block">SynoCommerce</span>
              <span className="text-[10px] tracking-widest uppercase text-amber-400 font-semibold block">
                Enterprise Storefront Engine
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
            Designed with Apple Store, Nike, and Shopify aesthetic standards. Powered by SynoStack Technologies enterprise ecommerce architecture.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Secured
            </span>
            <span className="text-slate-600">•</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">Shop Taxonomy</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                Ayurvedic Wellness
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                High-Acoustic Audio
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                Luxury Handloom Silk
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-400 transition-colors">
                Minimalist Workstations
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-amber-400 transition-colors text-amber-400 font-bold">
                🔥 Flash Clearance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link href="/collections" className="hover:text-amber-400 transition-colors">
                Curated Collections
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-amber-400 transition-colors">
                Partner Brands
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-amber-400 transition-colors">
                Search Engine
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                Admin Console
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">Customer Service</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <p>Support: concierge@synocommerce.com</p>
            <p>Hotline: +1 (800) 555-SYNO</p>
            <p>Bhilai Bhavan • Chhattisgarh</p>
            <div className="pt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-semibold text-[11px]">System Status: Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 SynoCommerce Enterprise Storefront. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 cursor-pointer">Cookie Preferences</span>
        </div>
      </div>
    </footer>
  );
}
