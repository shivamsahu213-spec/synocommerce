'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { OrderSuccessAnimation } from '@storefront/components/storefront/cart-checkout/OrderSuccessAnimation';
import { RelatedProducts } from '@storefront/components/storefront/cart-checkout/RelatedProducts';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CheckoutSuccessPage() {
  const sampleRelated = [
    {
      id: '4',
      slug: 'kalyan-triphala-juice-1l',
      name: 'Kalyan Triphala Juice 1L',
      category: 'Ayurvedic Wellness',
      brand: 'Kalyan Ayurvedic',
      price: 15.0,
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
      rating: 4.88,
      reviewsCount: 95,
      inStock: true,
      emoji: '🌿',
      tag: 'Stress Relief',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <Breadcrumb items={[{ label: 'Order Confirmation', href: '/checkout/success' }]} />

        <OrderSuccessAnimation orderId="SYN-2026-8842" estimatedDelivery="Saturday, Aug 8" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <RelatedProducts products={sampleRelated} />
      </main>

      <Footer />
    </div>
  );
}
