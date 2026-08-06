'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { CheckoutStepper } from '@storefront/components/storefront/cart-checkout/CheckoutStepper';
import { OrderSummary } from '@storefront/components/storefront/cart-checkout/OrderSummary';
import { PaymentMethodCard, PaymentType } from '@storefront/components/storefront/cart-checkout/PaymentMethodCard';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { ArrowRight, CreditCard } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function CheckoutPaymentPage() {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('card');

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Shopping Bag', href: '/cart' },
            { label: 'Shipping Method', href: '/checkout/shipping' },
            { label: 'Payment Method', href: '/checkout/payment' },
          ]}
        />

        <CheckoutStepper currentStep="payment" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Step 3 of 4</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">Select Payment Method</h2>
              <p className="text-xs text-slate-400">
                Choose your preferred payment gateway. All transactions are PCI-DSS Level 1 compliant.
              </p>
            </div>

            <PaymentMethodCard
              selectedType={selectedPaymentType}
              onSelectType={setSelectedPaymentType}
            />

            <div className="pt-4 flex justify-between gap-4">
              <Link
                href="/checkout/shipping"
                className="px-6 py-3.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-bold transition-all"
              >
                Back to Shipping
              </Link>

              <Link
                href="/checkout/review"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Continue to Order Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-24">
            <OrderSummary items={sampleItems} shippingFee={0} discountAmount={0} taxAmount={31.12} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
