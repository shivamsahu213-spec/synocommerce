/**
 * SynoCommerce Feature Flags & Experimentation Control Center UI
 * LaunchDarkly, Optimizely & PostHog Quality Flag Engine
 * @module apps/admin/src/app/feature-flags/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminFeatureFlagsPage() {
  const flagsList = [
    { key: 'enable_bhilai_express_checkout', name: 'Bhilai Express POS Checkout', rollout: '100%', env: 'PRODUCTION', status: 'ENABLED', target: 'Bhilai Retail POS' },
    { key: 'enable_holt_winters_forecasting', name: 'AI Holt-Winters Revenue Predictor', rollout: '50%', env: 'PRODUCTION', status: 'EXPERIMENT', target: 'Executive Admins' },
    { key: 'enable_whatsapp_cart_recovery', name: 'WhatsApp Cart Recovery Flow', rollout: '25%', env: 'PRODUCTION', status: 'EXPERIMENT', target: 'VIP Customers' },
    { key: 'enable_graphql_federation_v2', name: 'GraphQL Mesh Federation V2', rollout: '0%', env: 'STAGING', status: 'DISABLED', target: 'Dev Environment' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Feature Flags & A/B Experimentation"
      actions={
        <>
          <Button variant="secondary">🚨 Emergency Kill Switch</Button>
          <Button variant="secondary">🧪 New Experiment</Button>
          <Button variant="primary">+ Create Flag</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Feature Flags" value="24 Flags" variant="info" />
        <StatCard title="Active Experiments" value="6 Active" variant="info" />
        <StatCard title="Kill Switch Triggers" value="0 Fired" variant="success" />
        <StatCard title="Production Flags" value="18 Flags" variant="success" />
        <StatCard title="Target Segments" value="12 Rules" variant="info" />
        <StatCard title="Evaluations / Sec" value="14,200 req/s" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Environments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🔴 Production (18)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🟡 Staging (4)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🟢 Development (2)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Flag Key & Name</th>
                <th style={{ padding: '0.75rem' }}>Rollout %</th>
                <th style={{ padding: '0.75rem' }}>Target Audience</th>
                <th style={{ padding: '0.75rem' }}>Env</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {flagsList.map((f) => (
                <tr key={f.key} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{f.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'monospace' }}>{f.key}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{f.rollout}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{f.target}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {f.env === 'PRODUCTION' ? <Badge variant="danger">Prod</Badge> : <Badge variant="info">Stage</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {f.status === 'ENABLED' && <Badge variant="success">Enabled</Badge>}
                    {f.status === 'EXPERIMENT' && <Badge variant="warning">Experiment</Badge>}
                    {f.status === 'DISABLED' && <Badge variant="neutral">Disabled</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Kill Switch Safety</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Global Kill Switch</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>STANDBY (All Nominal)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
