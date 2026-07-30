/**
 * Slide-over Cart Drawer Component
 * @module apps/storefront/src/features/cart/CartDrawer
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Trash2, Plus, Minus, Tag } from 'lucide-react';
import { useStorefront } from '../../providers/storefront-provider';
import { formatCurrency } from '../../lib/utils';
import { CartItem } from '../../lib/commerce-client';

export function CartDrawer() {
  const {
    cart,
    cartTotals,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    currency,
  } = useStorefront();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <ShoppingBag className="h-5 w-5 text-indigo-500" />
            <span>Shopping Cart ({cart.items.length})</span>
          </div>
          <button onClick={closeCartDrawer} className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.items.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <ShoppingBag className="mx-auto h-12 w-12 text-slate-700" />
              <p>Your shopping cart is empty.</p>
            </div>
          ) : (
            cart.items.map((item: CartItem) => (
              <div key={item.sku} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div>
                  <div className="font-semibold text-sm text-white">{item.name}</div>
                  <div className="text-xs text-indigo-400 font-bold mt-0.5">{formatCurrency(item.unitPrice, currency)}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 p-1">
                    <button
                      onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                      className="p-1 hover:text-white text-slate-400"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                      className="p-1 hover:text-white text-slate-400"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.sku)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Input */}
        {cart.items.length > 0 && (
          <div className="py-3 border-t border-slate-800">
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME10)..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button type="submit" className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700">
                Apply
              </button>
            </form>
            {cart.appliedCoupon && (
              <div className="mt-1.5 text-[11px] text-emerald-400 font-semibold">
                Applied Coupon: {cart.appliedCoupon}
              </div>
            )}
          </div>
        )}

        {/* Totals & Checkout */}
        {cart.items.length > 0 && (
          <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(cartTotals.subtotal, currency)}</span>
            </div>
            {cartTotals.discountTotal > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Discount Applied</span>
                <span>-{formatCurrency(cartTotals.discountTotal, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Tax Estimate</span>
              <span>{formatCurrency(cartTotals.taxTotal, currency)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping Estimate</span>
              <span>{formatCurrency(cartTotals.shippingEstimate, currency)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm text-white">
              <span>Grand Total</span>
              <span className="text-indigo-400">{formatCurrency(cartTotals.grandTotal, currency)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCartDrawer}
              className="mt-2 block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700 shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
