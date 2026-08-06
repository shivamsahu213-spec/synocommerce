'use client';

import { Filter, RotateCcw, X } from 'lucide-react';
import React, { useState } from 'react';

import { BrandFilter } from './BrandFilter';
import { CategoryFilter, CategoryOption } from './CategoryFilter';
import { PriceSlider } from './PriceSlider';
import { RatingFilter } from './RatingFilter';

export function ProductFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  brands,
  selectedBrands,
  onToggleBrand,
  selectedRating,
  onSelectRating,
  minPrice,
  maxPrice,
  priceRange,
  onChangePriceRange,
  onResetFilters,
}: {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  selectedRating: number;
  onSelectRating: (rating: number) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onChangePriceRange: (range: [number, number]) => void;
  onResetFilters: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const FilterContent = (
    <div className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <PriceSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceRange={priceRange}
        onChangePriceRange={onChangePriceRange}
      />

      <BrandFilter brands={brands} selectedBrands={selectedBrands} onToggleBrand={onToggleBrand} />

      <RatingFilter selectedRating={selectedRating} onSelectRating={onSelectRating} />
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filter Products</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block w-72 shrink-0">{FilterContent}</div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-xs bg-slate-950 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-bold text-white">Filters</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}
    </>
  );
}
