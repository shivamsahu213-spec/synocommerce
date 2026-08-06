'use client';

import { ArrowRight, Search, Sparkles, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export function SearchBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  const trendingSearches = [
    'Kumkumadi Tailam',
    'Silk Saree',
    'Wireless Headphones',
    'Organic Ashwagandha',
    'Ergonomic Desk',
    'Smart Watch Ultra',
  ];

  const quickProducts = [
    { name: 'Kalyan Triphala Juice 1L', category: 'Ayurvedic Wellness', price: '$15.00', tag: 'Best Seller' },
    { name: 'Aura Wireless Noise Cancelling Headphones', category: 'Electronics', price: '$299.00', tag: 'Trending' },
    { name: 'Handcrafted Mulberry Silk Saree', category: 'Luxury Apparel', price: '$180.00', tag: 'New Arrival' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center pt-16 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-6 h-6 text-indigo-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, collections, SKUs..."
              className="w-full bg-transparent text-lg font-medium text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Trending Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(term)}
                className="px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-medium text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Instant Results Preview</span>
          </div>
          <div className="space-y-2">
            {quickProducts.map((prod, idx) => (
              <Link
                key={idx}
                href="/products"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    🛍️
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-xs text-slate-400">{prod.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-semibold border border-indigo-500/30">
                    {prod.tag}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">{prod.price}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
