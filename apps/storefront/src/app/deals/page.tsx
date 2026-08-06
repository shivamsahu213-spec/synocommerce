'use client';

import { FeaturedProducts } from '@storefront/components/storefront/FeaturedProducts';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { PromoBanner } from '@storefront/components/storefront/PromoBanner';
import React from 'react';

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      <main className="py-12 space-y-12">
        <PromoBanner />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
