/**
 * Admin Dashboard Payment Management Page
 * @module apps/admin/app/payments/page
 */

import React from 'react';

export default function AdminPaymentsPage() {
  const transactions = [
    { id: 'txn_razorpay_99182', gateway: 'RAZORPAY', amount: '₹2,499.00', status: 'CAPTURED', customer: 'shivam@example.com', date: '2026-08-05 12:15' },
    { id: 'txn_stripe_44102', gateway: 'STRIPE', amount: '$150.00', status: 'AUTHORIZED', customer: 'john@example.com', date: '2026-08-05 11:42' },
    { id: 'rfnd_razorpay_1102', gateway: 'RAZORPAY', amount: '₹499.00', status: 'REFUNDED', customer: 'priya@example.com', date: '2026-08-05 10:20' },
  ];

  const webhookLogs = [
    { id: 'wh_evt_881', gateway: 'RAZORPAY', event: 'payment.captured', timestamp: '12:15:02', status: 'VERIFIED_&_PROCESSED' },
    { id: 'wh_evt_882', gateway: 'STRIPE', event: 'payment_intent.succeeded', timestamp: '11:42:15', status: 'VERIFIED_&_PROCESSED' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Payment & Webhook Management</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Live Gateway Monitoring: Razorpay & Stripe</p>
      </header>

      {/* Transactions Section */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Recent Transactions & Refunds</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Transaction ID</th>
              <th style={{ padding: '0.75rem' }}>Gateway</th>
              <th style={{ padding: '0.75rem' }}>Amount</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Customer</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#93C5FD' }}>{tx.id}</td>
                <td style={{ padding: '0.75rem' }}>{tx.gateway}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{tx.amount}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: tx.status === 'CAPTURED' ? '#065F46' : tx.status === 'REFUNDED' ? '#7C2D12' : '#1E3A8A', color: '#F9FAFB' }}>
                    {tx.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{tx.customer}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Webhook Audit Logs Section */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Webhook Verification Audit Logs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {webhookLogs.map((log) => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#34D399' }}>[{log.gateway}]</span> {log.event} ({log.id})
              </div>
              <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold' }}>
                {log.status} • {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
