/**
 * SynoCommerce Omnichannel Support Inbox & Helpdesk UI
 * Gorgias, Zendesk & Freshdesk Quality Customer Support Portal
 * @module apps/admin/src/app/support/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminSupportPage() {
  const tickets = [
    { id: 'TCK-101', customer: 'Vaidya Sharma (Bhilai)', channel: 'WHATSAPP', subject: 'Inquiry regarding bulk wholesale Chyawanprash pricing', time: '10 mins ago', status: 'OPEN', agent: 'Meera Sen' },
    { id: 'TCK-102', customer: 'Priya Verma', channel: 'EMAIL', subject: 'Tracking status update for Order #ORD-98240', time: '25 mins ago', status: 'IN_PROGRESS', agent: 'Shivam Sahu' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Omnichannel Customer Support Inbox & Helpdesk"
      actions={
        <>
          <Button variant="secondary">💬 WhatsApp Queue</Button>
          <Button variant="secondary">🤖 AI Reply Suggestions</Button>
          <Button variant="primary">+ Create Ticket</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Open Support Tickets" value="14 Tickets" variant="warning" />
        <StatCard title="Avg First Response" value="4.2 Mins" variant="success" />
        <StatCard title="Avg Resolution Time" value="28 Mins" variant="success" />
        <StatCard title="CSAT Satisfaction" value="99.2%" variant="success" />
        <StatCard title="AI Copilot Handled" value="68% Auto" variant="success" />
        <StatCard title="WhatsApp Conversations" value="42 Active" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Inbox Channels</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>💬 WhatsApp (8 Open)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📧 Email Tickets (4 Open)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📱 Mobile App Chat (2 Open)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Ticket ID & Customer</th>
                <th style={{ padding: '0.75rem' }}>Channel</th>
                <th style={{ padding: '0.75rem' }}>Subject</th>
                <th style={{ padding: '0.75rem' }}>Assigned Agent</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{t.id}</div>
                    <div style={{ fontSize: '0.75rem', color: '#60A5FA' }}>{t.customer}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{t.channel}</td>
                  <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{t.subject}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{t.agent}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {t.status === 'OPEN' ? <Badge variant="warning">Open</Badge> : <Badge variant="info">In Progress</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>AI Auto-Draft</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Suggested Response</div>
            <div style={{ fontSize: '0.85rem', color: '#D1D5DB', marginTop: '0.35rem' }}>"Namaste Vaidya Sharma! Bulk pricing for 100+ jars is $18.00/unit with free Bhilai dispatch."</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
