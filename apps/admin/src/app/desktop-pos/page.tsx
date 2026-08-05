/**
 * Admin Dashboard Desktop POS Control Center & X/Z Report Viewer
 * @module apps/admin/app/desktop-pos/page
 */

import React from 'react';

export default function AdminDesktopPosPage() {
  const activeRegisters = [
    { registerId: 'REG_BHILAI_01', store: 'Bhilai Main Flagship', cashier: 'Rajesh Kumar', float: '$150.00', totalSales: '$2,840.50', status: 'OPEN' },
    { registerId: 'REG_BHILAI_02', store: 'Bhilai Express Counter', cashier: 'Priya Sharma', float: '$100.00', totalSales: '$1,920.00', status: 'OPEN' },
    { registerId: 'REG_RAIPUR_01', store: 'Raipur Hub Store', cashier: 'Anand Verma', float: '$200.00', totalSales: '$4,110.25', status: 'OPEN' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Desktop POS Control Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Shopify POS Pro & Square POS Grade Retail Terminal Management</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Active POS Registers</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>12 Terminals</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Today POS Sales</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>$8,870.75</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Thermal Printers Online</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>12 / 12</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Offline Queue Sync</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>0 Pending</div>
        </div>
      </div>

      {/* Registers Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Active Store Terminals</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Register ID</th>
              <th style={{ padding: '0.75rem' }}>Store Location</th>
              <th style={{ padding: '0.75rem' }}>Active Cashier</th>
              <th style={{ padding: '0.75rem' }}>Opening Float</th>
              <th style={{ padding: '0.75rem' }}>Session Sales</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeRegisters.map((r) => (
              <tr key={r.registerId} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{r.registerId}</td>
                <td style={{ padding: '0.75rem' }}>{r.store}</td>
                <td style={{ padding: '0.75rem' }}>{r.cashier}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{r.float}</td>
                <td style={{ padding: '0.75rem', color: '#10B981', fontWeight: 'bold' }}>{r.totalSales}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
