/**
 * SynoCommerce Enterprise Role-Based Access Control (RBAC) UI
 * AWS IAM, Salesforce Permission Sets & Microsoft Entra Quality Access Matrix Studio
 * @module apps/admin/src/app/rbac/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminRbacPage() {
  const rolesList = [
    {
      id: 'ROLE-001',
      name: 'Super Administrator',
      description: 'Full root privileges across all stores, settings, billing & security',
      usersCount: 6,
      permissionsCount: 128,
      lastUpdated: 'Aug 04, 2026',
      status: 'SYSTEM ROLE',
    },
    {
      id: 'ROLE-002',
      name: 'Store Manager',
      description: 'Full management over catalog, orders, customers & inventory',
      usersCount: 14,
      permissionsCount: 84,
      lastUpdated: 'Aug 02, 2026',
      status: 'CUSTOM ROLE',
    },
    {
      id: 'ROLE-003',
      name: 'POS Store Cashier',
      description: 'Desktop POS checkout, inventory lookups, local cash drawer',
      usersCount: 18,
      permissionsCount: 22,
      lastUpdated: 'Jul 28, 2026',
      status: 'CUSTOM ROLE',
    },
    {
      id: 'ROLE-004',
      name: 'Support & Loyalty Agent',
      description: 'Read-only order lookups, customer ticket resolutions & refund requests',
      usersCount: 4,
      permissionsCount: 18,
      lastUpdated: 'Jul 15, 2026',
      status: 'CUSTOM ROLE',
    },
  ];

  const permissionMatrix = [
    { resource: 'Products & Catalog', read: true, create: true, update: true, delete: false, export: true },
    { resource: 'Orders & Shipments', read: true, create: true, update: true, delete: false, export: true },
    { resource: 'Customer PII Data', read: true, create: false, update: true, delete: false, export: false },
    { resource: 'Financial Reports', read: true, create: false, update: false, delete: false, export: true },
    { resource: 'Security & API Keys', read: false, create: false, update: false, delete: false, export: false },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Role & Permission Access Matrix (RBAC)"
      actions={
        <>
          <Button variant="secondary">📥 Import Roles</Button>
          <Button variant="secondary">📤 Export Matrix</Button>
          <Button variant="secondary">+ Permission Set</Button>
          <Button variant="primary">+ Create Role</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Roles" value="16" />
        <StatCard title="Permission Sets" value="48" variant="info" />
        <StatCard title="Custom Roles" value="6" variant="info" />
        <StatCard title="Users Assigned" value="42 Users" variant="success" />
        <StatCard title="Protected Resources" value="128 Resources" variant="info" />
        <StatCard title="MFA Required Roles" value="8 Roles" variant="warning" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.5rem' }}>
        {/* Left Sidebar: Role Categories */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Role Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              🔒 System Roles (4)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🎨 Custom Roles (6)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📦 POS Store Roles (3)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🏢 Warehouse Roles (3)
            </div>
          </div>
        </div>

        {/* Center Panel: Roles Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Role Name</th>
                <th style={{ padding: '0.75rem' }}>Assigned Seats</th>
                <th style={{ padding: '0.75rem' }}>Permissions</th>
                <th style={{ padding: '0.75rem' }}>Type</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rolesList.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{r.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 'normal' }}>{r.description}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#34D399', fontWeight: 'bold' }}>{r.usersCount} Users</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{r.permissionsCount} Grants</td>
                  <td style={{ padding: '0.75rem' }}>
                    {r.status === 'SYSTEM ROLE' ? <Badge variant="info">System</Badge> : <Badge variant="neutral">Custom</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ color: '#60A5FA', cursor: 'pointer' }}>Configure Matrix</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel: Resource Access Matrix Preview */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Permission Matrix (Store Manager)</h3>
          <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {permissionMatrix.map((p, idx) => (
              <div key={idx} style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: '#F3F4F6', marginBottom: '0.35rem' }}>{p.resource}</div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {p.read && <Badge variant="success">Read</Badge>}
                  {p.create && <Badge variant="success">Create</Badge>}
                  {p.update && <Badge variant="success">Update</Badge>}
                  {p.export && <Badge variant="info">Export</Badge>}
                  {!p.delete && <Badge variant="danger">No Delete</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
