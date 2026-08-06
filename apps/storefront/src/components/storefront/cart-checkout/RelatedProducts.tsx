'use client';

import { ShoppingBag } from 'lucide-react';
import React from 'react';

export interface SimpleProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  emoji: string;
  tag: string;
}

export function RelatedProducts({ products }: { products: SimpleProduct[] }) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-slate-800">
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Curated For You</span>
        <h3 className="font-serif font-bold text-2xl text-white">Recommended Formulations</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-3xl shrink-0">
              {p.emoji}
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-bold">
                {p.tag}
              </span>
              <h4 className="font-serif font-bold text-sm text-white">{p.name}</h4>
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-emerald-400 text-sm">${p.price.toFixed(2)}</span>
                <button className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const RecentlyViewed = RelatedProducts;
