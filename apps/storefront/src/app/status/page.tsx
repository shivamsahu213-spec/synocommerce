/**
 * Storefront Public System Status & Maintenance Page
 * @module apps/storefront/app/status/page
 */

import React from 'react';

export default function StorefrontStatusPage() {
  const statusItems = [
    { name: 'Storefront & Checkout API', status: 'Operational', uptime: '99.99%' },
    { name: 'Payment Gateways (Razorpay & Stripe)', status: 'Operational', uptime: '100.0%' },
    { name: 'Shipping & Logistics API', status: 'Operational', uptime: '99.98%' },
    { name: 'Search & Recommendation Engine', status: 'Operational', uptime: '99.99%' },
  ];

  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#111827', padding: '2.5rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0, color: '#F3F4F6' }}>All SynoCommerce Systems Operational</h1>
        </div>

        <h3 style={{ marginBottom: '1rem', color: '#60A5FA' }}>Core Service Status</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {statusItems.map((item) => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1F2937', padding: '1rem', borderRadius: '6px' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#10B981' }}>{item.status}</div>
              </div>
              <span style={{ fontSize: '0.9rem', color: '#9CA3AF', fontFamily: 'monospace' }}>90-day Uptime: {item.uptime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
