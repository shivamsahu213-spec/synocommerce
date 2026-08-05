/**
 * SynoCommerce Multi-Environment Variables & Config Secrets Studio UI
 * Infisical, HashiCorp Vault & Vercel Env Quality Secrets Hub
 * @module apps/admin/src/app/environments/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminEnvironmentsPage() {
  const envVars = [
    { key: 'DATABASE_URL', value: 'postgresql://postgres:••••••••@127.0.0.1:5432/synocommerce', env: 'PRODUCTION', type: 'SECRET', lastUpdated: 'Aug 04, 2026' },
    { key: 'REDIS_CACHE_URL', value: 'redis://:••••••••@127.0.0.1:6379/0', env: 'PRODUCTION', type: 'SECRET', lastUpdated: 'Aug 01, 2026' },
    { key: 'OPENAI_API_KEY', value: 'sk-proj-••••••••••••••••••••••••', env: 'PRODUCTION', type: 'ENCRYPTED_KEY', lastUpdated: 'Jul 28, 2026' },
    { key: 'NEXT_PUBLIC_API_URL', value: 'https://api.synocommerce.com', env: 'ALL_ENVS', type: 'PUBLIC', lastUpdated: 'Jul 15, 2026' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Multi-Environment Variables & Config Secrets Studio"
      actions={
        <>
          <Button variant="secondary">🔑 Rotate Encryption Key</Button>
          <Button variant="secondary">📥 Import .env</Button>
          <Button variant="primary">+ Add Environment Variable</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Env Variables" value="48 Variables" variant="info" />
        <StatCard title="Secret Keys" value="18 Encrypted" variant="warning" />
        <StatCard title="Public Configs" value="30 Variables" variant="info" />
        <StatCard title="AES-256 Vault" value="Active (SOC2)" variant="success" />
        <StatCard title="Rotation Policy" value="90 Days Auto" variant="success" />
        <StatCard title="Sync Status" value="100% Synced" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Environments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🔴 Production (48)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🟡 Staging (48)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🟢 Local Dev (48)</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Variable Key Name</th>
                <th style={{ padding: '0.75rem' }}>Encrypted Value</th>
                <th style={{ padding: '0.75rem' }}>Environment</th>
                <th style={{ padding: '0.75rem' }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {envVars.map((e, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6', fontFamily: 'monospace' }}>{e.key}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{e.value}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {e.env === 'PRODUCTION' ? <Badge variant="danger">Production</Badge> : <Badge variant="info">All Envs</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {e.type === 'SECRET' || e.type === 'ENCRYPTED_KEY' ? <Badge variant="warning">Encrypted</Badge> : <Badge variant="neutral">Public</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Vault Encryption</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Hardware Security Module</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>AES-256-GCM Vault</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
