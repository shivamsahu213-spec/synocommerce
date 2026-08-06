'use client';

import { CategoryGrid } from '@storefront/components/storefront/CategoryGrid';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import React from 'react';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      <main className="py-12">
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
}
