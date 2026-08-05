/**
 * SynoCommerce Enterprise Settings & Organization Setup UI
 * Shopify Settings, Stripe Dashboard & Salesforce Setup Quality Configuration Portal
 * @module apps/admin/src/app/settings/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminSettingsPage() {
  const settingsCategories = [
    { title: 'Store Information', icon: '🏬', active: true },
    { title: 'Users & Roles (RBAC)', icon: '👥', active: false },
    { title: 'Billing & Subscription', icon: '💳', active: false },
    { title: 'Domains & SSL', icon: '🌐', active: false },
    { title: 'Taxes & Shipping Rules', icon: '🚚', active: false },
    { title: 'Payment Gateways', icon: '💳', active: false },
    { title: 'Webhooks & API Keys', icon: '🔑', active: false },
    { title: 'Security & Audit Logs', icon: '🛡️', active: false },
    { title: 'AI Copilot Settings', icon: '🤖', active: false },
    { title: 'Localization & Currency', icon: '🌍', active: false },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Enterprise Settings & Platform Configuration"
      actions={
        <>
          <Button variant="secondary">Discard Changes</Button>
          <Button variant="primary">💾 Save Settings</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Seats" value="42 Users" variant="info" />
        <StatCard title="API Requests (Mo)" value="14.2 M" change="+12.4%" variant="success" />
        <StatCard title="Cloud Storage" value="185 GB / 1TB" variant="info" />
        <StatCard title="Current Plan" value="Enterprise Plus" variant="success" />
        <StatCard title="Monthly Metered" value="$1,250.00" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '1.5rem' }}>
        {/* Left Sidebar: Settings Navigation */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Platform Setup</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            {settingsCategories.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: cat.active ? '#1F2937' : 'transparent',
                  color: cat.active ? '#60A5FA' : '#9CA3AF',
                  fontWeight: cat.active ? 'bold' : 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Store Configuration Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Store Profile & Organization Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', fontSize: '0.875rem' }}>
              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>Store Legal Name</label>
                <input type="text" defaultValue="Kalyan Ayurvedic Enterprise Ltd" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }} />
              </div>

              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>Business Support Email</label>
                <input type="email" defaultValue="support@kalyanayurvedic.com" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }} />
              </div>

              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>Contact Phone Number</label>
                <input type="text" defaultValue="+91 98271 45001" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }} />
              </div>

              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>Default Store Timezone</label>
                <select style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }}>
                  <option>(GMT+05:30) India Standard Time (Asia/Kolkata)</option>
                  <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>Operating Currency</label>
                <select style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }}>
                  <option>USD ($) - United States Dollar (Primary)</option>
                  <option>INR (₹) - Indian Rupee (Local)</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.35rem' }}>HQ Location</label>
                <input type="text" defaultValue="Bhilai Bhavan, Chhattisgarh, India" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 0.85rem', color: '#FFF' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Health & Security Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🛡️ Security Audit Status</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>SOC2 Type II</span>
              <Badge variant="success">COMPLIANT</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>GDPR Article 17</span>
              <Badge variant="success">ENFORCED</Badge>
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>💾 Hourly Backup Status</h4>
            <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold' }}>● Automated Snapshots Active</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Last snapshot verified 12 mins ago.</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
