'use client';

import { ChevronRight, Flame, Layers } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MenuColumn {
  name: string;
  links: string[];
}

interface MenuCategory {
  title: string;
  columns: MenuColumn[];
}

export function MegaMenu({ activeCategory, onClose }: { activeCategory: string | null; onClose: () => void }) {
  if (!activeCategory) return null;

  const categoryData: Record<string, MenuCategory> = {
    categories: {
      title: 'Shop By Category Taxonomy',
      columns: [
        {
          name: 'Ayurveda & Wellness',
          links: ['Kumkumadi Oils', 'Ashwagandha & Herbs', 'Triphala Juices', 'Chyawanprash', 'Ayurvedic Teas'],
        },
        {
          name: 'Electronics & Audio',
          links: ['Wireless Headphones', 'Noise Cancelling Earbuds', 'Smart Watches', 'Bluetooth Speakers'],
        },
        {
          name: 'Fashion & Luxury',
          links: ['Mulberry Silk Sarees', 'Artisanal Jackets', 'Leather Accessories', 'Design Footwear'],
        },
        {
          name: 'Home & Living',
          links: ['Ergonomic Chairs', 'Aroma Diffusers', 'Organic Linen', 'Handmade Ceramics'],
        },
      ],
    },
    collections: {
      title: 'Curated Storefront Collections',
      columns: [
        {
          name: 'Seasonal Drops',
          links: ['Spring / Summer 2026', 'Festival Special Edition', 'Monsoon Care Essentials', 'Minimalist Edits'],
        },
        {
          name: 'Bhilai Heritage',
          links: ['Kalyan Ayurvedic Reserve', 'Handloom Textiles', 'Iron Ore Artisan Craft', 'Local Botanicals'],
        },
      ],
    },
  };

  const fallback: MenuCategory = categoryData.categories!;
  const current = categoryData[activeCategory] || fallback;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl text-slate-100 py-10 px-8 z-40 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-8 grid grid-cols-4 gap-6">
          {current.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                {col.name}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href="/products"
                      onClick={onClose}
                      className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      <span>{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-4 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-7xl text-indigo-400">2026</div>
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              <Flame className="w-3 h-3" /> Featured Spotlight
            </span>
            <h3 className="font-serif text-xl font-bold text-white leading-tight">
              Bhilai Botanical Reserve • Cold-Pressed Kumkumadi
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              100% pure saffron infused in cold-pressed sesame oil. Formulated according to authentic Ayurvedic Charaka Samhita texts.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">Special Launch Price: $45.00</span>
            <Link
              href="/products"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md transition-all"
            >
              <span>Explore Drop</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
