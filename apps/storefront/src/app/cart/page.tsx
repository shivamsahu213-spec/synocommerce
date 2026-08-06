'use client';

import { Breadcrumb } from '@storefront/components/storefront/cart-checkout/Breadcrumb';
import { CartItem, CartItemType } from '@storefront/components/storefront/cart-checkout/CartItem';
import { CartSummary } from '@storefront/components/storefront/cart-checkout/CartSummary';
import { CouponBox } from '@storefront/components/storefront/cart-checkout/CouponBox';
import { DeliveryEstimator } from '@storefront/components/storefront/cart-checkout/DeliveryEstimator';
import { GiftWrapCard } from '@storefront/components/storefront/cart-checkout/GiftWrapCard';
import { RecentlyViewed, RelatedProducts } from '@storefront/components/storefront/cart-checkout/RelatedProducts';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([
    {
      id: 'c1',
      name: 'Bhilai Kumkumadi Saffron Oil 30ml',
      category: 'Ayurvedic Skincare',
      price: 45.0,
      quantity: 2,
      emoji: '✨',
      variant: '30ml Glass Bottle',
    },
    {
      id: 'c2',
      name: 'Aura Studio Wireless Headphones',
      category: 'High-Acoustic Audio',
      price: 299.0,
      quantity: 1,
      emoji: '🎧',
      variant: 'Matte Obsidian',
    },
  ]);

  const [savedItems, setSavedItems] = useState<CartItemType[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [giftWrapEnabled, setGiftWrapEnabled] = useState(false);

  const handleUpdateQuantity = (id: string, qty: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSavedItems((prev) => [...prev, item]);
    }
  };

  const handleMoveToCart = (id: string) => {
    const item = savedItems.find((i) => i.id === id);
    if (item) {
      setSavedItems((prev) => prev.filter((i) => i.id !== id));
      setItems((prev) => [...prev, item]);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPct) / 100;
  const giftWrapFee = giftWrapEnabled ? 5.0 : 0;
  const taxAmount = (subtotal - discountAmount) * 0.08;

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

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <Breadcrumb items={[{ label: 'Shopping Bag', href: '/cart' }]} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Complimentary Concierge Packaging
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Your Shopping Bag</h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setItems([])}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear Shopping Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-slate-900/50 border border-slate-800 rounded-3xl max-w-2xl mx-auto">
            <span className="text-6xl block">🛍️</span>
            <h3 className="font-serif font-bold text-2xl text-white">Your bag is empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Discover our luxury formulations and audiophile products to add items to your cart.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items list & Saved for Later */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </div>

              {/* Coupon & Delivery Estimator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CouponBox
                  onApplyCoupon={(code, pct) => {
                    setAppliedCoupon(code);
                    setDiscountPct(pct);
                  }}
                  appliedCoupon={appliedCoupon}
                />
                <DeliveryEstimator />
              </div>

              {/* Gift Wrap Card */}
              <GiftWrapCard
                enabled={giftWrapEnabled}
                onToggleGiftWrap={(enabled) => setGiftWrapEnabled(enabled)}
              />

              {/* Saved For Later Section */}
              {savedItems.length > 0 && (
                <div className="pt-8 border-t border-slate-800 space-y-4">
                  <h3 className="font-serif font-bold text-lg text-white">Saved For Later ({savedItems.length})</h3>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <h5 className="font-serif font-bold text-xs text-white">{item.name}</h5>
                            <span className="text-xs text-emerald-400 font-bold">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item.id)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                        >
                          Move to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 sticky top-24">
              <CartSummary
                subtotal={subtotal}
                discountAmount={discountAmount}
                giftWrapFee={giftWrapFee}
                taxAmount={taxAmount}
              />
            </div>
          </div>
        )}

        <RelatedProducts products={sampleRelated} />
        <RecentlyViewed products={sampleRelated} />
      </main>

      <Footer />
    </div>
  );
}
