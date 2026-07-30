/**
 * Storefront Product Detail Page Feature View
 * @module apps/storefront/src/features/products/ProductDetailPageView
 */

'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, ShieldCheck, CheckCircle2, Truck, RotateCcw } from 'lucide-react';
import { STOREFRONT_PRODUCTS, recommendationEngine } from '../../lib/commerce-client';
import { useStorefront } from '../../providers/storefront-provider';
import { formatCurrency } from '../../lib/utils';

export function ProductDetailPageView({ productId }: { productId: string }) {
  const { addToCart, toggleWishlist, wishlist, currency } = useStorefront();
  const [quantity, setQuantity] = useState(1);

  const product = STOREFRONT_PRODUCTS.find((p) => p.id === productId) || STOREFRONT_PRODUCTS[0]!;
  const relatedProducts = recommendationEngine.getRelatedProducts(product.category, product.id);

  return (
    <div className="space-y-12 py-8">
      {/* Product Detail Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery Placeholder Frame */}
        <div className="flex h-96 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-slate-500 font-bold text-lg">
          {product.name} High-Res Gallery
        </div>

        {/* Info & Buy Section */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-400">
              {product.category}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">{product.name}</h1>
            <p className="mt-1 text-xs text-slate-400">SKU: {product.sku} | Brand: {product.brand}</p>
          </div>

          <div className="text-3xl font-extrabold text-white">{formatCurrency(product.price, currency)}</div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> In Stock (Dispatches within 24 Hours)
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Enterprise hardware build engineered for heavy-duty daily performance. Includes full SynoCommerce warranty coverage and 24/7 priority customer support.
          </p>

          {/* Add to Cart Controls */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-slate-400 hover:text-white"
              >
                -
              </button>
              <span className="px-3 font-bold text-sm text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-slate-400 hover:text-white"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product.sku, quantity)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-sm text-white hover:bg-indigo-700 shadow-xl"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.sku)}
              className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-slate-400 hover:text-red-400"
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.sku) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h3 className="text-xl font-bold text-white">Related Products</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <div className="font-bold text-sm text-white">{p.name}</div>
                <div className="text-sm font-extrabold text-indigo-400">{formatCurrency(p.price, currency)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
