'use client';

import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { Search, Sparkles, Star } from 'lucide-react';
import React, { useState } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const searchResults = [
    { name: 'Kalyan Triphala Juice 1L', category: 'Ayurvedic Wellness', price: '$15.00', rating: 4.9, emoji: '🍵' },
    { name: 'Aura Studio Wireless Headphones', category: 'Electronics', price: '$299.00', rating: 4.95, emoji: '🎧' },
    { name: 'Handcrafted Mulberry Silk Saree', category: 'Luxury Apparel', price: '$180.00', rating: 5.0, emoji: '👘' },
    { name: 'Bhilai Kumkumadi Saffron Oil 30ml', category: 'Ayurvedic Skincare', price: '$45.00', rating: 4.98, emoji: '✨' },
    { name: 'Organic Ashwagandha Gold 60s', category: 'Ayurvedic Wellness', price: '$18.00', rating: 4.88, emoji: '🌿' },
    { name: 'Smart Ergonomic Task Chair', category: 'Workstation', price: '$420.00', rating: 4.92, emoji: '🪑' },
  ];

  const filtered = searchResults.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Search Engine</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-white">Search & Discover Catalog</h1>
        </div>

        {/* Search input bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by keyword, formulation, category..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-medium"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-sm font-medium focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Ayurvedic Wellness">Ayurvedic Wellness</option>
            <option value="Electronics">Electronics</option>
            <option value="Luxury Apparel">Luxury Apparel</option>
            <option value="Workstation">Workstation</option>
          </select>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-full aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-5xl mb-4">
                  {item.emoji}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white">{item.name}</h3>
                <span className="text-xs text-slate-400">{item.category}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="font-serif font-bold text-lg text-emerald-400">{item.price}</span>
                <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
