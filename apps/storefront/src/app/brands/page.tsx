'use client';

import { BrandCarousel } from '@storefront/components/storefront/BrandCarousel';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import React from 'react';

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      <main className="py-12 space-y-12">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Global Partners</span>
          <h1 className="font-serif text-4xl font-bold text-white">Partnered Luxury & Enterprise Brands</h1>
          <p className="text-sm text-slate-400 max-w-xl font-light">
            Direct partnerships with official heritage ateliers, tech innovators, and botanical research laboratories.
          </p>
        </div>
        <BrandCarousel />
      </main>
      <Footer />
    </div>
  );
}
