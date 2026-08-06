'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { OrderFailure } from '@storefront/components/storefront/cart-checkout/OrderFailure';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import React from 'react';

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <Breadcrumb items={[{ label: 'Payment Status • Failed', href: '/checkout/failed' }]} />

        <OrderFailure reason="Issuer bank declined transaction due to 3D-Secure authentication timeout." />
      </main>

      <Footer />
    </div>
  );
}
