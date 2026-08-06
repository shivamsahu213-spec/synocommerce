'use client';

import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  origPrice?: number | undefined;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  emoji: string;
  tag: string;
  ingredients?: string[] | undefined;
}

export function ProductCard({
  product,
  viewMode = 'grid',
  onQuickView,
}: {
  product: ProductItem;
  viewMode?: 'grid' | 'list' | undefined;
  onQuickView?: ((product: ProductItem) => void) | undefined;
}) {
  const [isLiked, setIsLiked] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
            {product.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-semibold">
                {product.tag}
              </span>
              <span className="text-slate-400">{product.brand}</span>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="font-serif text-lg font-bold text-white hover:text-amber-400 transition-colors"
            >
              {product.name}
            </Link>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full sm:w-auto justify-between border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0">
          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>
            {product.origPrice && (
              <span className="text-xs text-slate-500 line-through">${product.origPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-indigo-400 font-semibold border border-slate-700">
            {product.tag}
          </span>
          <div className="flex items-center gap-1">
            {onQuickView && (
              <button
                onClick={() => onQuickView(product)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="w-full aspect-square rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center text-7xl mb-6 group-hover:scale-105 transition-transform duration-300"
        >
          {product.emoji}
        </Link>

        <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-500">({product.reviewsCount} reviews)</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors block mb-1"
        >
          {product.name}
        </Link>
        <span className="text-xs text-slate-400 block mb-4">{product.category}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div>
          <span className="text-[10px] text-slate-500 uppercase block">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-emerald-400">${product.price.toFixed(2)}</span>
            {product.origPrice && (
              <span className="text-xs text-slate-500 line-through">${product.origPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Select</span>
        </Link>
      </div>
    </div>
  );
}
