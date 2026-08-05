/**
 * SynoCommerce OAuth 2.0 Applications & Scopes Management UI
 * Auth0, Okta & GitHub Quality OAuth Studio
 * @module apps/admin/src/app/oauth/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminOAuthPage() {
  const oauthApps = [
    { id: 'APP-001', name: 'Bhilai POS Mobile App (iOS/Android)', clientId: 'client_pos_bhilai_98240', redirectUri: 'synopos://oauth/callback', scopes: 'read:inventory, write:orders', status: 'ACTIVE' },
    { id: 'APP-002', name: 'SAP S/4HANA Enterprise Connector', clientId: 'client_sap_s4hana_18420', redirectUri: 'https://sap.kalyanayurvedic.com/oauth/callback', scopes: 'full_access', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="OAuth 2.0 Client Applications & Scopes Control"
      actions={
        <>
          <Button variant="secondary">🔑 Rotate Client Secret</Button>
          <Button variant="secondary">📜 Scope Policies</Button>
          <Button variant="primary">+ Register OAuth App</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Registered OAuth Apps" value="8 Apps" variant="info" />
        <StatCard title="Active Tokens" value="1,420 Tokens" variant="success" />
        <StatCard title="Token Grant Rate" value="99.98%" variant="success" />
        <StatCard title="Token Lifespan" value="1 Hour (JWT)" variant="info" />
        <StatCard title="PKCE Enforcement" value="100% Active" variant="success" />
        <StatCard title="Security Level" value="OAuth 2.1 Compliant" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Grant Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🔑 Authorization Code + PKCE</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>⚡ Client Credentials (M2M)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🔄 Refresh Token Rotation</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Client Application</th>
                <th style={{ padding: '0.75rem' }}>Client ID</th>
                <th style={{ padding: '0.75rem' }}>Allowed Scopes</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {oauthApps.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{a.name}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontFamily: 'monospace' }}>{a.clientId}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{a.scopes}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Token Signing Key</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>JWKS Endpoint</div>
            <div style={{ fontSize: '0.85rem', color: '#10B981', fontFamily: 'monospace', marginTop: '0.25rem' }}>/.well-known/jwks.json</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
