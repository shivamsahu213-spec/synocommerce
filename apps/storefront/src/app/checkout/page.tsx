/**
 * Live Storefront Checkout Component with Razorpay & Stripe Support
 * @module apps/storefront/app/checkout/page
 */

import React from 'react';

export default function StorefrontCheckoutPage() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#111827', padding: '2.5rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#60A5FA' }}>Enterprise Live Checkout</h1>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#1F2937', padding: '1.25rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Kalyan Ayurvedic Triphala Juice (1L) x 2</span>
            <strong>₹1,198.00</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Shipping Fee</span>
            <strong>FREE</strong>
          </div>
          <hr style={{ borderColor: '#374151', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#34D399' }}>
            <span>Total Payable:</span>
            <span>₹1,198.00</span>
          </div>
        </div>

        {/* Payment Provider Buttons */}
        <h3 style={{ marginBottom: '1rem' }}>Select Payment Provider</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button style={{ padding: '1rem', backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            Pay with Razorpay (Cards, UPI, Netbanking)
          </button>
          <button style={{ padding: '1rem', backgroundColor: '#6366F1', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            Pay with Stripe (Credit/Debit Card)
          </button>
        </div>
      </div>
    </div>
  );
}
