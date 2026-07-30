/**
 * Storefront Home Page Feature View
 * @module apps/storefront/src/features/home/HomePageView
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { STOREFRONT_PRODUCTS } from '../../lib/commerce-client';
import { useStorefront } from '../../providers/storefront-provider';
import { formatCurrency } from '../../lib/utils';

export function HomePageView() {
  const { addToCart, toggleWishlist, wishlist, currency } = useStorefront();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-8 md:p-16 text-center md:text-left">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen Enterprise Commerce
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Built for Modern Commerce Teams
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            High-performance headless storefront architecture powered by the SynoCommerce Commerce Engine and IAM module.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-y border-slate-800 py-8">
        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <Truck className="h-6 w-6 text-indigo-400" />
          <div>
            <div className="font-bold text-sm text-white">Free Express Shipping</div>
            <div className="text-xs text-slate-400">On all orders over $150</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          <div>
            <div className="font-bold text-sm text-white">2-Year Syno Warranty</div>
            <div className="text-xs text-slate-400">Guaranteed hardware coverage</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <RotateCcw className="h-6 w-6 text-indigo-400" />
          <div>
            <div className="font-bold text-sm text-white">30-Day Easy Returns</div>
            <div className="text-xs text-slate-400">Hassle-free RMA processing</div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Featured Hardware & Gear</h2>
            <p className="text-xs text-slate-400">Top-rated items in our store catalog</p>
          </div>
          <Link href="/products" className="text-xs font-semibold text-indigo-400 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STOREFRONT_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-slate-700 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                    {product.category}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.sku)}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.sku) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <Link href={`/products/${product.id}`} className="block font-bold text-sm text-white hover:text-indigo-400 transition-colors">
                  {product.name}
                </Link>

                <div className="text-xs text-slate-400">Brand: {product.brand}</div>
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
      </section>
    </div>
  );
}
