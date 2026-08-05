/**
 * Storefront Shipment Tracking & Timeline Page
 * @module apps/storefront/app/tracking/page
 */

import React from 'react';

export default function StorefrontTrackingPage() {
  const events = [
    { status: 'MANIFESTED', time: 'Aug 04, 10:00 AM', desc: 'Shipment manifest generated and label printed.' },
    { status: 'PICKUP_SCHEDULED', time: 'Aug 04, 02:30 PM', desc: 'Package picked up by Shiprocket courier driver.' },
    { status: 'IN_TRANSIT', time: 'Aug 05, 08:15 AM', desc: 'Arrived at Raipur Regional Sorting Hub.' },
  ];

  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#111827', padding: '2.5rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#60A5FA' }}>Track Your Order</h1>
        <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>AWB Number: <span style={{ color: '#34D399', fontFamily: 'monospace' }}>AWB_SHIPROCKET_881923</span></p>

        <h3 style={{ marginBottom: '1.5rem', color: '#F3F4F6' }}>Shipment Progress Timeline</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid #374151', paddingLeft: '1.5rem' }}>
          {events.map((evt, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-2.05rem', top: '0.2rem', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#60A5FA' }} />
              <div style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#60A5FA' }}>{evt.status}</div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>{evt.time}</div>
              <div style={{ color: '#D1D5DB', fontSize: '0.95rem' }}>{evt.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
