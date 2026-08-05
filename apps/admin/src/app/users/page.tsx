/**
 * SynoCommerce Enterprise Users & Team Management UI
 * Shopify, Salesforce & Microsoft Entra Admin Center Quality RBAC Portal
 * @module apps/admin/src/app/users/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminUsersPage() {
  const usersList = [
    {
      id: 'USR-001',
      name: 'Shivam Sahu',
      email: 'shivam.sahu@synocommerce.com',
      role: 'SUPER ADMIN',
      department: 'Executive / Engineering',
      store: 'All Locations (Global)',
      lastLogin: '2 mins ago',
      mfa: 'ENABLED',
      status: 'ACTIVE',
      avatar: '👨‍💻',
    },
    {
      id: 'USR-002',
      name: 'Ankit Mishra',
      email: 'ankit.mishra@kalyanayurvedic.com',
      role: 'STORE MANAGER',
      department: 'Retail Operations',
      store: 'Kalyan Bhilai Store',
      lastLogin: '14 mins ago',
      mfa: 'ENABLED',
      status: 'ACTIVE',
      avatar: '👨‍💼',
    },
    {
      id: 'USR-003',
      name: 'Suresh Kumar',
      email: 'suresh.k@kalyanayurvedic.com',
      role: 'POS OPERATOR',
      department: 'Retail POS',
      store: 'Raipur Hub POS',
      lastLogin: '42 mins ago',
      mfa: 'DISABLED',
      status: 'ACTIVE',
      avatar: '👨‍🌾',
    },
    {
      id: 'USR-004',
      name: 'Meera Sen',
      email: 'meera.sen@synocommerce.com',
      role: 'SUPPORT AGENT',
      department: 'Customer Service',
      store: 'Online Storefront',
      lastLogin: '1 day ago',
      mfa: 'ENABLED',
      status: 'PENDING',
      avatar: '👩‍💼',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Users & Team Access Control (RBAC)"
      actions={
        <>
          <Button variant="secondary">📥 Bulk Import</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">+ Invite User</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Team Seats" value="42" />
        <StatCard title="Active Users" value="38" variant="success" />
        <StatCard title="Pending Invites" value="4" variant="warning" />
        <StatCard title="Administrators" value="6" variant="info" />
        <StatCard title="Store Managers" value="14" variant="info" />
        <StatCard title="Support Agents" value="18" />
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search name, email, role or department..."
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#F9FAFB', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }}
        />
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Role: All Roles</option>
          <option>Super Admin</option>
          <option>Store Manager</option>
          <option>Support Agent</option>
        </select>
        <select style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.5rem 1rem', color: '#D1D5DB', fontSize: '0.85rem', outline: 'none' }}>
          <option>Status: All Statuses</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* 2-Column Table & Sidebar Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        {/* Main Users Table */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>User</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Department</th>
                <th style={{ padding: '0.75rem' }}>Assigned Location</th>
                <th style={{ padding: '0.75rem' }}>MFA</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <span style={{ marginRight: '0.5rem' }}>{u.avatar}</span> {u.name}
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 'normal' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 'bold' }}>{u.role}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{u.department}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{u.store}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {u.mfa === 'ENABLED' ? <Badge variant="success">2FA On</Badge> : <Badge variant="warning">Disabled</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {u.status === 'ACTIVE' ? <Badge variant="success">Active</Badge> : <Badge variant="warning">Pending</Badge>}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#60A5FA', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <span>Edit</span>
                      <span style={{ color: '#EF4444' }}>Revoke</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar: Security Alerts & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>🛡️ Security Audit Log</h4>
            <div style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
              <strong>Shivam Sahu</strong> logged in from IP 103.22.14.8 (Bhilai)
            </div>
            <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginTop: '0.35rem' }}>
              <strong>Ankit Mishra</strong> updated inventory stock at Bhilai Hub
            </div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#F3F4F6', fontSize: '0.9rem' }}>✉️ Pending Staff Invites (4)</h4>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
              meera.sen@synocommerce.com (Support Agent)
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
