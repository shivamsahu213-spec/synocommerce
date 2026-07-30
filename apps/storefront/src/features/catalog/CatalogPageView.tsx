/**
 * Storefront Catalog Page Feature View
 * @module apps/storefront/src/features/catalog/CatalogPageView
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Filter, SlidersHorizontal } from 'lucide-react';
import { STOREFRONT_PRODUCTS } from '../../lib/commerce-client';
import { useStorefront } from '../../providers/storefront-provider';
import { formatCurrency } from '../../lib/utils';

export function CatalogPageView() {
  const { addToCart, toggleWishlist, wishlist, currency } = useStorefront();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories = ['ALL', 'Audio', 'Accessories', 'Furniture', 'Monitors'];

  const filteredProducts = STOREFRONT_PRODUCTS.filter(
    (p) => selectedCategory === 'ALL' || p.category === selectedCategory
  ).sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">All Store Products</h1>
        <p className="text-xs text-slate-400">Filter, sort, and browse full hardware catalog.</p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 font-bold text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-200 focus:outline-none"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                  {product.category}
                </span>
                <button onClick={() => toggleWishlist(product.sku)} className="p-1 text-slate-500 hover:text-red-400">
                  <Heart className={`h-4 w-4 ${wishlist.includes(product.sku) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              <Link href={`/products/${product.id}`} className="block font-bold text-sm text-white hover:text-indigo-400">
                {product.name}
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="text-base font-extrabold text-white">{formatCurrency(product.price, currency)}</div>
              <button
                onClick={() => addToCart(product.sku)}
                className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
