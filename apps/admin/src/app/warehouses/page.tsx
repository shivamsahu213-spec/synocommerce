/**
 * SynoCommerce Multi-Location Warehouses & Bin Location Management UI
 * @module apps/admin/src/app/warehouses/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminWarehousesPage() {
  const warehouses = [
    { id: 'WH-001', name: 'Bhilai Central Hub Warehouse', location: 'Bhilai, Chhattisgarh', bins: '1,420 Bins', capacity: '84% Full', status: 'ACTIVE' },
    { id: 'WH-002', name: 'Raipur Regional Fulfillment Depot', location: 'Raipur, Chhattisgarh', bins: '980 Bins', capacity: '62% Full', status: 'ACTIVE' },
    { id: 'WH-003', name: 'Bengaluru South Node', location: 'Bengaluru, Karnataka', bins: '1,840 Bins', capacity: '76% Full', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Multi-Location Warehouses & Bin Inventory Control"
      actions={
        <>
          <Button variant="secondary">🔄 Inter-Warehouse Transfer</Button>
          <Button variant="secondary">📍 Bin Location Map</Button>
          <Button variant="primary">+ Add Warehouse</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Warehouses" value="3 Nodes" variant="info" />
        <StatCard title="Active Bins" value="4,240 Bins" variant="info" />
        <StatCard title="Avg Capacity" value="74% Full" variant="success" />
        <StatCard title="Stock Transfers" value="14 In Transit" variant="info" />
        <StatCard title="Pick Accuracy" value="99.94%" variant="success" />
        <StatCard title="Warehouse SLA" value="100% On Time" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Fulfillment Nodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>🏬 Bhilai Hub (Primary)</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>🏭 Raipur Regional</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>📦 Bengaluru South</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Warehouse Facility</th>
                <th style={{ padding: '0.75rem' }}>Location</th>
                <th style={{ padding: '0.75rem' }}>Bin Storage</th>
                <th style={{ padding: '0.75rem' }}>Capacity Used</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w) => (
                <tr key={w.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{w.name}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{w.location}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{w.bins}</td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{w.capacity}</td>
                  <td style={{ padding: '0.75rem' }}><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Storage Optimization</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Fastest Moving Bins</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Aisle 4 - Zone B (Bhilai)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
