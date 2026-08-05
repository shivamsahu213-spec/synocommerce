/**
 * Admin Dashboard Monitoring, APM & Incident Operations Center
 * @module apps/admin/app/monitoring/page
 */

import React from 'react';

export default function AdminMonitoringPage() {
  const healthChecks = [
    { component: 'DATABASE', status: 'HEALTHY', latency: '4ms', message: 'PostgreSQL pool operational' },
    { component: 'REDIS', status: 'HEALTHY', latency: '2ms', message: 'Redis cluster cache hit 99.4%' },
    { component: 'PAYMENTS', status: 'HEALTHY', latency: '12ms', message: 'Razorpay & Stripe gateways operational' },
    { component: 'SEARCH', status: 'HEALTHY', latency: '5ms', message: 'Meilisearch cluster responsive' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>APM & Incident Operations Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Datadog, Prometheus, Grafana, Sentry, New Relic & PagerDuty</p>
      </header>

      {/* SLA & SLO Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>System Availability (SLA)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>99.99%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>p95 Latency</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>45 ms</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Open SEV1 Incidents</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>0</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>SLO Target Met</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>YES (99.9%)</div>
        </div>
      </div>

      {/* Component Health Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>System Component Diagnostics</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Component</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Latency</th>
              <th style={{ padding: '0.75rem' }}>Diagnostic Message</th>
            </tr>
          </thead>
          <tbody>
            {healthChecks.map((hc) => (
              <tr key={hc.component} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{hc.component}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#065F46', color: '#F9FAFB' }}>
                    {hc.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{hc.latency}</td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{hc.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
