'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { CheckoutStepper } from '@storefront/components/storefront/cart-checkout/CheckoutStepper';
import { OrderSummary } from '@storefront/components/storefront/cart-checkout/OrderSummary';
import { ShippingMethodCard, ShippingOption } from '@storefront/components/storefront/cart-checkout/ShippingMethodCard';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function CheckoutShippingPage() {
  const [selectedShippingId, setSelectedShippingId] = useState('express');

  const shippingOptions: ShippingOption[] = [
    {
      id: 'express',
      name: 'Complimentary Express Air',
      price: 0,
      estDays: 'Guaranteed Delivery: Sat, Aug 8 (BlueDart Air)',
      tag: 'Recommended',
    },
    {
      id: 'priority',
      name: 'VIP Concierge Same-Day',
      price: 25.0,
      estDays: 'Guaranteed Delivery Today by 8:00 PM IST',
      tag: 'Ultra Fast',
    },
    {
      id: 'standard',
      name: 'Standard Eco Ground',
      price: 0,
      estDays: 'Delivery: Mon, Aug 10 - Tue, Aug 11',
      tag: 'Standard',
    },
  ];

  const sampleItems = [
    {
      id: 'c1',
      name: 'Bhilai Kumkumadi Saffron Oil 30ml',
      category: 'Ayurvedic Skincare',
      price: 45.0,
      quantity: 2,
      emoji: '✨',
    },
    {
      id: 'c2',
      name: 'Aura Studio Wireless Headphones',
      category: 'High-Acoustic Audio',
      price: 299.0,
      quantity: 1,
      emoji: '🎧',
    },
  ];

  const activeShipping = shippingOptions.find((s) => s.id === selectedShippingId);
  const shippingFee = activeShipping ? activeShipping.price : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Shopping Bag', href: '/cart' },
            { label: 'Address', href: '/checkout' },
            { label: 'Shipping Method', href: '/checkout/shipping' },
          ]}
        />

        <CheckoutStepper currentStep="shipping" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Step 2 of 4</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">Select Shipping Method</h2>
              <p className="text-xs text-slate-400">
                Choose your preferred carrier and delivery speed for your luxury shipment.
              </p>
            </div>

            <ShippingMethodCard
              options={shippingOptions}
              selectedId={selectedShippingId}
              onSelect={setSelectedShippingId}
            />

            <div className="pt-4 flex justify-between gap-4">
              <Link
                href="/checkout"
                className="px-6 py-3.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-bold transition-all"
              >
                Back to Address
              </Link>

              <Link
                href="/checkout/payment"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-24">
            <OrderSummary items={sampleItems} shippingFee={shippingFee} discountAmount={0} taxAmount={31.12} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
