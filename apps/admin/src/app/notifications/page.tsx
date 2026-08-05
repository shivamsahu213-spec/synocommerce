/**
 * SynoCommerce Enterprise Notifications & Alert Center UI
 * Shopify Admin Notifications, Salesforce Notification Center & Microsoft 365 Quality Hub
 * @module apps/admin/src/app/notifications/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminNotificationsPage() {
  const notificationsFeed = [
    {
      id: 'NOTIF-001',
      icon: '🚨',
      title: 'Low Stock Alert: Bhilai Hub',
      description: 'Organic Chyawanprash 500g is down to 120 units. Reorder recommended.',
      time: '4 mins ago',
      priority: 'HIGH',
      status: 'UNREAD',
      category: 'Inventory',
    },
    {
      id: 'NOTIF-002',
      icon: '👑',
      title: 'VIP Order Approval Required',
      description: 'Order #ORD-98240 ($1,450.00) requires manager approval for wholesale discount.',
      time: '18 mins ago',
      priority: 'HIGH',
      status: 'UNREAD',
      category: 'Orders',
    },
    {
      id: 'NOTIF-003',
      icon: '🤖',
      title: 'AI Revenue Forecast Update',
      description: 'Holt-Winters algorithm updated 30-day forecast to $1.65M (+14.2%).',
      time: '1 hour ago',
      priority: 'INFO',
      status: 'READ',
      category: 'AI Copilot',
    },
    {
      id: 'NOTIF-004',
      icon: '⚡',
      title: 'Workflow Execution Completed',
      description: 'Monsoon WhatsApp Campaign flow successfully triggered for 18,400 VIPs.',
      time: '2 hours ago',
      priority: 'SUCCESS',
      status: 'READ',
      category: 'Workflows',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Notifications & Alert Stream"
      actions={
        <>
          <Button variant="secondary">📤 Export Logs</Button>
          <Button variant="secondary">⚙️ Preferences</Button>
          <Button variant="primary">✓ Mark All Read</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Unread Notifications" value="12 Alert" variant="warning" />
        <StatCard title="Critical Alerts" value="2 Action" variant="danger" />
        <StatCard title="Workflow Events" value="48 Events" variant="info" />
        <StatCard title="Failed Integrations" value="0 Syncs" variant="success" />
        <StatCard title="Announcements" value="3 Updates" variant="info" />
        <StatCard title="Pending Approvals" value="4 Pending" variant="warning" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left Sidebar: Notification Channels */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Alert Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🔔 All Alerts (12 Unread)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📦 Inventory Alerts (4)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🛍️ Order Approvals (3)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🤖 AI Insights (2)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🛡️ Security & System (3)
            </div>
          </div>
        </div>

        {/* Center Panel: Notifications Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notificationsFeed.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.95rem' }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{item.time}</span>
                    {item.status === 'UNREAD' ? <Badge variant="warning">Unread</Badge> : <Badge variant="neutral">Read</Badge>}
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '0.75rem' }}>{item.description}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="secondary">View Details</Button>
                  <Button variant="secondary">Dismiss</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Pending Approvals */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Pending Approvals (4)</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 'bold', color: '#F3F4F6' }}>Wholesale Discount #ORD-98240</div>
            <div style={{ color: '#9CA3AF', marginTop: '0.25rem' }}>Requested by Ankit Mishra</div>
            <div style={{ marginTop: '0.5rem' }}><Badge variant="warning">Awaiting Approval</Badge></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
