/**
 * Admin Dashboard Low-Code Application Designer Control Center
 * @module apps/admin/app/low-code-portal/page
 */

import React from 'react';

export default function AdminLowCodePortalPage() {
  const customApps = [
    { name: 'Kalyan Warehouse Picking Portal', type: 'WAREHOUSE_APP', dataSource: 'POSTGRESQL', version: 'v1.2.0', status: 'PUBLISHED' },
    { name: 'Ayurvedic Doctor Consultation CRM', type: 'CRM_APP', dataSource: 'SALESFORCE', version: 'v1.4.1', status: 'PUBLISHED' },
    { name: 'Bhilai Inventory Reorder Tool', type: 'INVENTORY_APP', dataSource: 'REST_API', version: 'v1.0.2', status: 'PUBLISHED' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Low-Code Application Designer Studio</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Salesforce Lightning & Retool Grade Visual App Builder</p>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Published Low-Code Apps</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>18 Custom Tools</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Component Library Palette</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>30 Components</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Data Source Connectors</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>11 Connectors</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Daily Workflow Invocations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>14,250 Calls</div>
        </div>
      </div>

      {/* Published Apps Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Active Internal Enterprise Applications</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Application Name</th>
              <th style={{ padding: '0.75rem' }}>App Type</th>
              <th style={{ padding: '0.75rem' }}>Primary Data Source</th>
              <th style={{ padding: '0.75rem' }}>Version</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {customApps.map((a) => (
              <tr key={a.name} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#93C5FD' }}>{a.name}</td>
                <td style={{ padding: '0.75rem' }}>{a.type}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{a.dataSource}</td>
                <td style={{ padding: '0.75rem', color: '#34D399' }}>{a.version}</td>
                <td style={{ padding: '0.75rem', color: '#10B981', fontWeight: 'bold' }}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
