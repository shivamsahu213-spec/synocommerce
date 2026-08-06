'use client';

import React from 'react';

import { ProductCard, ProductItem } from './ProductCard';

export function RelatedProducts({ products }: { products: ProductItem[] }) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-slate-800">
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Curated For You</span>
        <h3 className="font-serif font-bold text-2xl text-white">Complementary Formulations & Accessories</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
