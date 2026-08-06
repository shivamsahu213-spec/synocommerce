'use client';

import { Heart, ShoppingBag, Star } from 'lucide-react';
import React, { useState } from 'react';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'trending' | 'bestsellers' | 'flash' | 'new'>('trending');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const products = [
    {
      id: 1,
      name: 'Kalyan Triphala Juice 1L',
      category: 'Ayurvedic Wellness',
      price: '$15.00',
      origPrice: '$20.00',
      rating: 4.9,
      reviews: 142,
      tag: 'Best Seller',
      emoji: '🍵',
      tabs: ['bestsellers', 'trending'],
    },
    {
      id: 2,
      name: 'Aura Studio Wireless Headphones',
      category: 'High-Acoustic Audio',
      price: '$299.00',
      origPrice: '$349.00',
      rating: 4.95,
      reviews: 88,
      tag: 'Hi-Fi Lossless',
      emoji: '🎧',
      tabs: ['trending', 'new'],
    },
    {
      id: 3,
      name: 'Handcrafted Mulberry Silk Saree',
      category: 'Luxury Apparel',
      price: '$180.00',
      origPrice: '$220.00',
      rating: 5.0,
      reviews: 64,
      tag: 'Handloom',
      emoji: '👘',
      tabs: ['trending', 'new'],
    },
    {
      id: 4,
      name: 'Bhilai Kumkumadi Saffron Oil 30ml',
      category: 'Ayurvedic Skincare',
      price: '$45.00',
      origPrice: '$60.00',
      rating: 4.98,
      reviews: 210,
      tag: '24K Glow',
      emoji: '✨',
      tabs: ['bestsellers', 'flash'],
    },
    {
      id: 5,
      name: 'Organic Ashwagandha Gold 60s',
      category: 'Herbal Supplement',
      price: '$18.00',
      origPrice: '$24.00',
      rating: 4.88,
      reviews: 95,
      tag: 'Stress Relief',
      emoji: '🌿',
      tabs: ['bestsellers', 'flash'],
    },
    {
      id: 6,
      name: 'Smart Ergonomic Task Chair',
      category: 'Workstation',
      price: '$420.00',
      origPrice: '$499.00',
      rating: 4.92,
      reviews: 34,
      tag: 'Ergonomic',
      emoji: '🪑',
      tabs: ['new', 'trending'],
    },
  ];

  const filtered = products.filter((p) => p.tabs.includes(activeTab));

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-2">
            Curated Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Trending Products & Best Sellers</h2>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-slate-900 border border-slate-800 p-1.5 rounded-full">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'trending' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔥 Trending
          </button>
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'bestsellers' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⭐ Best Sellers
          </button>
          <button
            onClick={() => setActiveTab('flash')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'flash' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Flash Sale
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'new' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ✨ New Arrivals
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => {
          const isLiked = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-indigo-400 font-semibold border border-slate-700">
                    {product.tag}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="w-full aspect-video rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  {product.emoji}
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.reviews} reviews)</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                  {product.name}
                </h3>
                <span className="text-xs text-slate-400 block mb-4">{product.category}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-emerald-400">{product.price}</span>
                    <span className="text-xs text-slate-500 line-through">{product.origPrice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
