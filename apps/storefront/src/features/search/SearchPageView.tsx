/**
 * Storefront Search Page Feature View
 * @module apps/storefront/src/features/search/SearchPageView
 */

'use client';

import { Frown,Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { searchEngine } from '../../lib/commerce-client';
import { formatCurrency } from '../../lib/utils';
import { useStorefront } from '../../providers/storefront-provider';

export function SearchPageView({ query }: { query: string }) {
  const { addToCart, currency } = useStorefront();
  const results = searchEngine.search({ term: query });
  const suggestions = searchEngine.autocomplete(query);

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Search Results</h1>
        <p className="text-xs text-slate-400">Showing matches for &quot;{query}&quot;</p>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-3">
          <Frown className="mx-auto h-12 w-12 text-slate-600" />
          <h2 className="text-lg font-bold text-white">No products found matching &quot;{query}&quot;</h2>
          <p className="text-xs text-slate-400">Try searching for &quot;Headphones&quot;, &quot;Keyboard&quot;, or &quot;Monitor&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                {product.category}
              </span>
              <Link href={`/products/${product.id}`} className="block font-bold text-sm text-white hover:text-indigo-400">
                {product.name}
              </Link>
              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <div className="text-base font-extrabold text-white">{formatCurrency(product.price, currency)}</div>
                <button
                  onClick={() => addToCart(product.sku)}
                  className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
