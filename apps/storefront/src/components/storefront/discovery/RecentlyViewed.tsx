'use client';

import Link from 'next/link';
import React from 'react';

import { ProductItem } from './ProductCard';

export function RecentlyViewed({ products }: { products: ProductItem[] }) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-slate-800">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recently Viewed</h4>

      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="min-w-[200px] p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-xl shrink-0">
              {item.emoji}
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                {item.name}
              </h5>
              <span className="text-[11px] font-bold text-emerald-400 block">${item.price.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
