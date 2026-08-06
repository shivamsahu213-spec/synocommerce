'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { CheckoutStepper } from '@storefront/components/storefront/cart-checkout/CheckoutStepper';
import { OrderSummary } from '@storefront/components/storefront/cart-checkout/OrderSummary';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { CreditCard, MapPin, ShieldCheck, Truck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CheckoutReviewPage() {
  const router = useRouter();
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePlaceOrder = () => {
    if (!agreedTerms) return;
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Shopping Bag', href: '/cart' },
            { label: 'Payment', href: '/checkout/payment' },
            { label: 'Order Review', href: '/checkout/review' },
          ]}
        />

        <CheckoutStepper currentStep="review" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Step 4 of 4</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">Review & Confirm Order</h2>
              <p className="text-xs text-slate-400">
                Please verify your delivery address, shipping option, and payment method before placing order.
              </p>
            </div>

            {/* Selected Address Summary Card */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <MapPin className="w-4 h-4 text-indigo-400" /> Shipping Address
                </div>
                <Link href="/checkout" className="text-xs text-amber-400 hover:underline">
                  Edit
                </Link>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Shivam Sahu (Home) • 14, Bhilai Bhavan, Botanical Enclave, Bhilai, CG - 490006
              </p>
            </div>

            {/* Selected Shipping Summary Card */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Truck className="w-4 h-4 text-emerald-400" /> Delivery Method
                </div>
                <Link href="/checkout/shipping" className="text-xs text-amber-400 hover:underline">
                  Edit
                </Link>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Complimentary Express Air (BlueDart Air) • Guaranteed Delivery by Sat, Aug 8
              </p>
            </div>

            {/* Selected Payment Summary Card */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CreditCard className="w-4 h-4 text-amber-400" /> Payment Method
                </div>
                <Link href="/checkout/payment" className="text-xs text-amber-400 hover:underline">
                  Edit
                </Link>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Credit Card (Visa ending in •••• 8842) • Encrypted 256-Bit SSL
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <span>
                  I agree to the SynoCommerce Luxury{' '}
                  <strong className="text-amber-400">Terms of Sale</strong>, Refund Policy, and Privacy Policy.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex justify-between items-center gap-4">
              <Link
                href="/checkout/payment"
                className="px-6 py-3.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-bold transition-all"
              >
                Back to Payment
              </Link>

              <button
                onClick={handlePlaceOrder}
                disabled={!agreedTerms || isSubmitting}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>{isSubmitting ? 'Authorizing Payment...' : 'Place Order & Pay Now'}</span>
              </button>
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
