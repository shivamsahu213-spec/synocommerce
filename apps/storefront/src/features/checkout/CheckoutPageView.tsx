/**
 * Storefront Checkout Page Feature View
 * @module apps/storefront/src/features/checkout/CheckoutPageView
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Truck, CheckCircle2, Lock } from 'lucide-react';
import { useStorefront } from '../../providers/storefront-provider';
import { checkoutEngine, OrderRecord, CartItem } from '../../lib/commerce-client';
import { formatCurrency } from '../../lib/utils';

export function CheckoutPageView() {
  const router = useRouter();
  const { cart, cartTotals, currency } = useStorefront();

  const [step, setStep] = useState<'SHIPPING' | 'PAYMENT' | 'CONFIRMATION'>('SHIPPING');
  const [fullName, setFullName] = useState('John Doe');
  const [street, setStreet] = useState('123 Tech Boulevard');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94105');
  const [country, setCountry] = useState('USA');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PAYMENT');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const session = checkoutEngine.startCheckout(cart, 'cust_storefront_001');
      checkoutEngine.setShippingAddress(session.id, {
        fullName,
        street,
        city,
        postalCode,
        country,
      });

      const order = await checkoutEngine.completeCheckout(session.id, cart, 'Stripe');
      setConfirmedOrder(order);
      setStep('CONFIRMATION');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0 && !confirmedOrder) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <button
          onClick={() => router.push('/products')}
          className="rounded-full bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Express Checkout</h1>
        <p className="text-xs text-slate-400">Secure end-to-end checkout powered by Commerce Engine</p>
      </div>

      {step === 'CONFIRMATION' && confirmedOrder ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
          <p className="text-xs text-slate-300">Order Number: <span className="font-bold text-indigo-400">{confirmedOrder.orderNumber}</span></p>
          <p className="text-xs text-slate-400">Transaction ID: {confirmedOrder.paymentTransactionId}</p>
          <div className="pt-4">
            <button
              onClick={() => router.push('/products')}
              className="rounded-full bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Steps Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'SHIPPING' && (
              <form onSubmit={handleShippingSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-indigo-400" /> 1. Shipping Address
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-xs text-white hover:bg-indigo-700"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'PAYMENT' && (
              <form onSubmit={handlePaymentSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-400" /> 2. Payment Details (Stripe Test Gateway)
                </h3>
                <div className="rounded-lg bg-slate-950 p-3 text-xs text-slate-400 space-y-1">
                  <div>Encrypted Payment Method: <span className="font-semibold text-white">Stripe Instant Token</span></div>
                  <div>Shipping To: {fullName}, {street}, {city}</div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-xs text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Processing Order...' : `Pay ${formatCurrency(cartTotals.grandTotal, currency)} & Place Order`}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Side Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 h-fit">
            <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">Order Summary</h3>
            <div className="space-y-2 text-xs divide-y divide-slate-800">
              {cart.items.map((i: CartItem) => (
                <div key={i.sku} className="pt-2 flex justify-between">
                  <span className="text-slate-300">{i.name} x {i.quantity}</span>
                  <span className="font-semibold text-white">{formatCurrency(i.totalPrice, currency)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{formatCurrency(cartTotals.subtotal, currency)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Tax</span><span>{formatCurrency(cartTotals.taxTotal, currency)}</span></div>
              <div className="flex justify-between font-bold text-sm text-white pt-2"><span>Total</span><span className="text-indigo-400">{formatCurrency(cartTotals.grandTotal, currency)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
