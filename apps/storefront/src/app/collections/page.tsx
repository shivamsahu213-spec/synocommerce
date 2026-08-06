'use client';

import { CollectionCarousel } from '@storefront/components/storefront/CollectionCarousel';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import React from 'react';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      <main className="py-12">
        <CollectionCarousel />
      </main>
      <Footer />
    </div>
  );
}
