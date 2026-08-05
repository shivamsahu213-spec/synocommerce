/**
 * SynoCommerce Enterprise Customer CRM & 360 Timeline UI
 * Salesforce CRM & HubSpot Quality Customer Portal
 * @module apps/admin/src/app/crm/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminCrmPage() {
  const customerProfiles = [
    { id: 'CRM-1001', name: 'Vaidya Ramesh Sharma', email: 'ramesh.sharma@ayurveda.org', orders: '34 Orders', ltv: '$4,850.00', segment: 'GOLD VIP VAIDYA', location: 'Bhilai, CG', lastActivity: '12 mins ago' },
    { id: 'CRM-1002', name: 'Priya Verma', email: 'priya.v@gmail.com', orders: '12 Orders', ltv: '$1,420.00', segment: 'AUTOSHIP SUBSCRIBER', location: 'Raipur, CG', lastActivity: '2 hours ago' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Customer CRM & 360 Lifetime Timeline"
      actions={
        <>
          <Button variant="secondary">📥 Import Contacts</Button>
          <Button variant="secondary">📊 LTV Analytics</Button>
          <Button variant="primary">+ Create Profile</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Contacts" value="18,420 Contacts" variant="info" />
        <StatCard title="VIP Vaidya Profiles" value="1,420 Profiles" variant="success" />
        <StatCard title="Average LTV" value="$420.00" change="+14.2%" variant="success" />
        <StatCard title="Repeat Customer Rate" value="68.4%" variant="success" />
        <StatCard title="Active Autoships" value="1,840 Active" variant="info" />
        <StatCard title="Churn Risk" value="0.4% Low" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Customer Tiers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>👑 Gold VIP Vaidyas (1,420)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🔄 Autoship Subscribers (1,840)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🛍️ Retail Buyers (15,160)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Customer Profile</th>
                <th style={{ padding: '0.75rem' }}>Location</th>
                <th style={{ padding: '0.75rem' }}>Lifetime Orders</th>
                <th style={{ padding: '0.75rem' }}>Total LTV</th>
                <th style={{ padding: '0.75rem' }}>Segment Badge</th>
              </tr>
            </thead>
            <tbody>
              {customerProfiles.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{c.email}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{c.location}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{c.orders}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{c.ltv}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">{c.segment}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>360 Activity Stream</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 'bold', color: '#F3F4F6' }}>Vaidya Ramesh Sharma</div>
            <div style={{ color: '#9CA3AF', marginTop: '0.25rem' }}>Placed Order #ORD-98240 ($1,450.00)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
