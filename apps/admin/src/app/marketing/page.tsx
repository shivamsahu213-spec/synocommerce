/**
 * SynoCommerce Enterprise Marketing Automation UI
 * Klaviyo, Mailchimp & HubSpot Marketing Hub Quality Marketing Studio
 * @module apps/admin/src/app/marketing/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminMarketingPage() {
  const campaignsList = [
    {
      id: 'CAMP-001',
      name: 'Monsoon Ayurvedic Festival Sale',
      channel: 'EMAIL & SMS',
      audience: 'Vaidya VIP & Repeat Buyers (18,400)',
      status: 'RUNNING',
      openRate: '48.2%',
      ctr: '14.1%',
      revenue: '$285,000.00',
      scheduled: 'Aug 01 - Aug 31, 2026',
    },
    {
      id: 'CAMP-002',
      name: 'Kumkumadi Serum VIP WhatsApp Launch',
      channel: 'WHATSAPP',
      audience: 'High LTV Customers (4,200)',
      status: 'RUNNING',
      openRate: '88.5%',
      ctr: '32.4%',
      revenue: '$145,000.00',
      scheduled: 'Aug 04 - Aug 10, 2026',
    },
    {
      id: 'CAMP-003',
      name: 'Welcome Onboarding Journey Flow',
      channel: 'EMAIL (AUTOMATION)',
      audience: 'New Subscribers (12,800)',
      status: 'RUNNING',
      openRate: '54.0%',
      ctr: '18.2%',
      revenue: '$92,000.00',
      scheduled: 'Always Active',
    },
    {
      id: 'CAMP-004',
      name: 'Festive Flash Sale Push Alert',
      channel: 'PUSH NOTIFICATION',
      audience: 'Mobile App Users (22,000)',
      status: 'SCHEDULED',
      openRate: '0.0%',
      ctr: '0.0%',
      revenue: '$0.00',
      scheduled: 'Sep 01, 2026 @ 10:00 AM',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Marketing Automation Studio"
      actions={
        <>
          <Button variant="secondary">👥 Import Audience</Button>
          <Button variant="secondary">📤 Export Report</Button>
          <Button variant="secondary">🤖 AI Campaign</Button>
          <Button variant="primary">+ Create Campaign</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Campaigns" value="14" variant="info" />
        <StatCard title="Email Open Rate" value="42.8%" change="+4.2%" variant="success" />
        <StatCard title="Click-Through Rate" value="12.4%" change="+1.8%" variant="success" />
        <StatCard title="Revenue Driven" value="$620,000.00" change="+22.4%" variant="success" />
        <StatCard title="Total Subscribers" value="48,200" change="+8.4%" variant="success" />
        <StatCard title="Campaign ROI" value="4.8x" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem' }}>
        {/* Left Sidebar: Channels & Segments */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Channels & Journeys</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              📧 Email Campaigns (8 Active)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📱 SMS Broadcasts (3 Active)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              💬 WhatsApp Marketing (2 Active)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔔 Push Notifications (1 Active)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🔄 Automation Journeys (6 Flows)
            </div>
          </div>
        </div>

        {/* Center: Campaigns Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Campaign</th>
                <th style={{ padding: '0.75rem' }}>Channel</th>
                <th style={{ padding: '0.75rem' }}>Open Rate</th>
                <th style={{ padding: '0.75rem' }}>CTR</th>
                <th style={{ padding: '0.75rem' }}>Revenue</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaignsList.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{c.audience}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{c.channel}</td>
                  <td style={{ padding: '0.75rem' }}>{c.openRate}</td>
                  <td style={{ padding: '0.75rem' }}>{c.ctr}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#34D399' }}>{c.revenue}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {c.status === 'RUNNING' && <Badge variant="success">Running</Badge>}
                    {c.status === 'SCHEDULED' && <Badge variant="info">Scheduled</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar: AI Marketing Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>⏰ Best Send Time Recommendation</h4>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10B981' }}>10:00 AM IST</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Open rates peak by +24% when sending broadcast campaigns on Tuesday mornings.</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🤖 AI Campaign Optimization</h4>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', borderLeft: '3px solid #3B82F6' }}>
              💡 Send an automated WhatsApp follow-up to cart abandoners from Bhilai. Predicted +$34k extra revenue.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
