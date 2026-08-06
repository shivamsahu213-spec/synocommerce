'use client';

import { LayoutGrid, List } from 'lucide-react';
import React, { useState } from 'react';

import { ProductCard, ProductItem } from './ProductCard';

export function ProductGrid({
  products,
  onQuickView,
}: {
  products: ProductItem[];
  onQuickView?: ((product: ProductItem) => void) | undefined;
}) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginated = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Grid Header Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-white">{paginated.length}</strong> of{' '}
          <strong className="text-white">{products.length}</strong> luxury items
        </span>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid or List Layout */}
      {paginated.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-slate-900/50 border border-slate-800 rounded-3xl">
          <span className="text-4xl block">🔍</span>
          <h3 className="font-serif font-bold text-xl text-white">No Products Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting your active filter selections.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'
          }
        >
          {paginated.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              {...(onQuickView ? { onQuickView } : {})}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
