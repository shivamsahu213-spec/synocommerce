/**
 * SynoCommerce Customer Segmentation & Cohort Builder UI
 * Klaviyo, Customer.io & Segment Quality Cohort Studio
 * @module apps/admin/src/app/segments/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminSegmentsPage() {
  const segments = [
    { name: 'Gold VIP Vaidyas (LTV > $2,000)', count: '1,420 Contacts', growth: '+14.2%', rule: 'Orders >= 10 AND Spend > $2000', status: 'DYNAMIC' },
    { name: 'Autoship Subscribers (Active)', count: '1,840 Contacts', growth: '+8.4%', rule: 'Subscription Status == ACTIVE', status: 'DYNAMIC' },
    { name: 'Bhilai / Raipur Local Buyers', count: '4,280 Contacts', growth: '+18.1%', rule: 'Location == CG_INDIA', status: 'DYNAMIC' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Customer Segmentation & Cohort Builder Studio"
      actions={
        <>
          <Button variant="secondary">📥 Export Segment</Button>
          <Button variant="secondary">📢 Sync to Klaviyo</Button>
          <Button variant="primary">+ Create Segment</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Segments" value="18 Cohorts" variant="info" />
        <StatCard title="Segmented Contacts" value="18,420 (100%)" variant="success" />
        <StatCard title="Real-time Dynamic" value="100% Synced" variant="success" />
        <StatCard title="Avg Cohort Size" value="1,023 Contacts" variant="info" />
        <StatCard title="Targeted Campaign LTV" value="3.4x Higher" variant="success" />
        <StatCard title="Sync Health" value="Healthy" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Segment Rules</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>👑 High LTV VIPs (3)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🔄 Autoship Subscribers (2)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📍 Geo-Targeted (4)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Segment Name</th>
                <th style={{ padding: '0.75rem' }}>Audience Count</th>
                <th style={{ padding: '0.75rem' }}>Dynamic Filter Rule</th>
                <th style={{ padding: '0.75rem' }}>Growth MoM</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{s.name}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{s.count}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{s.rule}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{s.growth}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="info">Dynamic</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Fastest Growing</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Top Growth Cohort</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Bhilai Local Buyers (+18.1%)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
