'use client';

import { Breadcrumb } from '@storefront/components/storefront/discovery/Breadcrumb';
import { ProductItem } from '@storefront/components/storefront/discovery/ProductCard';
import { ProductFilters } from '@storefront/components/storefront/discovery/ProductFilters';
import { ProductGrid } from '@storefront/components/storefront/discovery/ProductGrid';
import { SortDropdown, SortOption } from '@storefront/components/storefront/discovery/SortDropdown';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { Search, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export default function ProductListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentSort, setCurrentSort] = useState<SortOption>('featured');

  const categories = [
    { id: 'ayurveda', name: 'Ayurvedic Wellness', count: 142 },
    { id: 'audio', name: 'High-Acoustic Audio', count: 88 },
    { id: 'apparel', name: 'Luxury Apparel & Silk', count: 210 },
    { id: 'workstation', name: 'Smart Workstations', count: 64 },
    { id: 'living', name: 'Aroma & Living', count: 95 },
  ];

  const brands = ['Kalyan Ayurvedic', 'Aura Acoustic', 'Mulberry Handlooms', 'SmartStation', 'Sephora Paris'];

  const allProducts: ProductItem[] = [
    {
      id: '1',
      slug: 'bhilai-kumkumadi-saffron-oil',
      name: 'Bhilai Kumkumadi Saffron Oil 30ml',
      category: 'Ayurvedic Wellness',
      brand: 'Kalyan Ayurvedic',
      price: 45.0,
      origPrice: 60.0,
      rating: 4.98,
      reviewsCount: 210,
      inStock: true,
      emoji: '✨',
      tag: '24K Glow',
    },
    {
      id: '2',
      slug: 'aura-studio-wireless-headphones',
      name: 'Aura Studio Wireless Headphones',
      category: 'High-Acoustic Audio',
      brand: 'Aura Acoustic',
      price: 299.0,
      origPrice: 349.0,
      rating: 4.95,
      reviewsCount: 88,
      inStock: true,
      emoji: '🎧',
      tag: 'Hi-Fi Lossless',
    },
    {
      id: '3',
      slug: 'handcrafted-mulberry-silk-saree',
      name: 'Handcrafted Mulberry Silk Saree',
      category: 'Luxury Apparel & Silk',
      brand: 'Mulberry Handlooms',
      price: 180.0,
      origPrice: 220.0,
      rating: 5.0,
      reviewsCount: 64,
      inStock: true,
      emoji: '👘',
      tag: 'Handloom',
    },
    {
      id: '4',
      slug: 'kalyan-triphala-juice-1l',
      name: 'Kalyan Triphala Juice 1L',
      category: 'Ayurvedic Wellness',
      brand: 'Kalyan Ayurvedic',
      price: 15.0,
      origPrice: 20.0,
      rating: 4.9,
      reviewsCount: 142,
      inStock: true,
      emoji: '🍵',
      tag: 'Best Seller',
    },
    {
      id: '5',
      slug: 'organic-ashwagandha-gold-60s',
      name: 'Organic Ashwagandha Gold 60s',
      category: 'Ayurvedic Wellness',
      brand: 'Kalyan Ayurvedic',
      price: 18.0,
      origPrice: 24.0,
      rating: 4.88,
      reviewsCount: 95,
      inStock: true,
      emoji: '🌿',
      tag: 'Stress Relief',
    },
    {
      id: '6',
      slug: 'smart-ergonomic-task-chair',
      name: 'Smart Ergonomic Task Chair',
      category: 'Smart Workstations',
      brand: 'SmartStation',
      price: 420.0,
      origPrice: 499.0,
      rating: 4.92,
      reviewsCount: 34,
      inStock: true,
      emoji: '🪑',
      tag: 'Ergonomic',
    },
  ];

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedRating(0);
    setPriceRange([0, 500]);
    setCurrentSort('featured');
  };

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchesRating = selectedRating === 0 || p.rating >= selectedRating;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesBrand && matchesRating && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (currentSort === 'price-low') return a.price - b.price;
    if (currentSort === 'price-high') return b.price - a.price;
    if (currentSort === 'rating') return b.rating - a.rating;
    if (currentSort === 'newest') return Number(b.id) - Number(a.id);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Breadcrumb items={[{ label: 'Catalog Discovery', href: '/products' }]} />

        {/* Page Banner Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Authenticity</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Product Catalog & Discovery</h1>
            <p className="text-sm text-slate-400 max-w-xl font-light">
              Explore our complete collection of Ayurvedic formulations, audiophile tech, handloom silk, and workspace designs.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-indigo-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            brands={brands}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            selectedRating={selectedRating}
            onSelectRating={setSelectedRating}
            minPrice={0}
            maxPrice={500}
            priceRange={priceRange}
            onChangePriceRange={setPriceRange}
            onResetFilters={handleResetFilters}
          />

          <div className="flex-1">
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
