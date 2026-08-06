/**
 * Admin Dashboard Shipping & Logistics Management Page
 * @module apps/admin/app/shipping/page
 */

import React from 'react';

export default function AdminShippingPage() {
  const shipments = [
    { id: 'SHP_ORD-9912_A1', awb: 'AWB_SHIPROCKET_881923', carrier: 'SHIPROCKET', status: 'IN_TRANSIT', origin: 'Bhilai', destination: 'Raipur', date: '2026-08-05' },
    { id: 'SHP_ORD-9913_B2', awb: 'AWB_DELHIVERY_771920', carrier: 'DELHIVERY', status: 'OUT_FOR_DELIVERY', origin: 'Mumbai', destination: 'Delhi', date: '2026-08-05' },
    { id: 'SHP_ORD-9914_C3', awb: 'AWB_FEDEX_110294', carrier: 'FEDEX', status: 'DELIVERED', origin: 'Bhilai', destination: 'New York', date: '2026-08-04' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Multi-Carrier Shipping & Fulfillment</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Shiprocket, Delhivery, FedEx, UPS, DHL, BlueDart, DTDC, India Post</p>
      </header>

      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Active Shipments & Labels</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>AWB Number</th>
              <th style={{ padding: '0.75rem' }}>Carrier</th>
              <th style={{ padding: '0.75rem' }}>Route</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shp) => (
              <tr key={shp.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#93C5FD' }}>{shp.awb}</td>
                <td style={{ padding: '0.75rem' }}>{shp.carrier}</td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{shp.origin} ➔ {shp.destination}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: shp.status === 'DELIVERED' ? '#065F46' : '#1E3A8A', color: '#F9FAFB' }}>
                    {shp.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <a href={`https://cdn.synocommerce.com/labels/${shp.awb}.pdf`} style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: 'bold' }}>
                    Download Label PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
