/**
 * SynoCommerce Enterprise Workflow Automation UI
 * Shopify Flow, n8n, Zapier & Microsoft Power Automate Quality Visual Node Editor
 * @module apps/admin/src/app/workflows/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminWorkflowsPage() {
  const triggerPalette = [
    { name: 'Order Created', icon: '🛍️', category: 'Orders' },
    { name: 'Inventory Stock Low', icon: '📦', category: 'Inventory' },
    { name: 'Customer VIP Upgraded', icon: '👑', category: 'Customers' },
    { name: 'Cart Abandoned', icon: '🛒', category: 'Marketing' },
    { name: 'Scheduled Cron Job', icon: '⏰', category: 'Schedules' },
  ];

  const executionLogs = [
    { id: 'EXEC-901', workflow: 'VIP Order Auto-Fulfillment', trigger: 'Order Created (#18420)', duration: '34 ms', status: 'SUCCESS', time: '2 mins ago' },
    { id: 'EXEC-902', workflow: 'Low Stock Restock Notification', trigger: 'Inventory Stock Low (Chyawanprash)', duration: '12 ms', status: 'SUCCESS', time: '14 mins ago' },
    { id: 'EXEC-903', workflow: 'Cart Abandonment WhatsApp Flow', trigger: 'Cart Abandoned (Bhilai)', duration: '48 ms', status: 'SUCCESS', time: '22 mins ago' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Workflow Automation Studio (Node Editor)"
      actions={
        <>
          <Button variant="secondary">📋 Templates</Button>
          <Button variant="secondary">📥 Import Flow</Button>
          <Button variant="secondary">📤 Export Flow</Button>
          <Button variant="primary">+ Create Workflow</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Workflows" value="24 Flows" variant="info" />
        <StatCard title="Executions Today" value="18,420" change="+12.4%" variant="success" />
        <StatCard title="Successful Runs" value="99.8%" variant="success" />
        <StatCard title="Failed Runs" value="3 Runs" variant="danger" />
        <StatCard title="Avg Execution Time" value="42 ms" variant="success" />
        <StatCard title="Tasks Automated (Mo)" value="142 K" variant="info" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px', marginBottom: '2rem' }}>
        {/* Left Palette */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Trigger & Action Nodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            {triggerPalette.map((t, idx) => (
              <div key={idx} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'grab' }}>
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Node Visual Canvas */}
        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {/* Node 1: Trigger */}
          <div style={{ width: '280px', padding: '0.75rem 1rem', backgroundColor: '#1E3A8A', border: '2px solid #3B82F6', borderRadius: '8px', textAlign: 'center' }}>
            <Badge variant="info">TRIGGER</Badge>
            <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>🛍️ Order Created (&gt; $200)</div>
          </div>

          <div style={{ color: '#3B82F6', fontSize: '1.2rem', fontWeight: 'bold' }}>↓</div>

          {/* Node 2: Decision Condition */}
          <div style={{ width: '280px', padding: '0.75rem 1rem', backgroundColor: '#312E81', border: '2px solid #8B5CF6', borderRadius: '8px', textAlign: 'center' }}>
            <Badge variant="warning">CONDITION</Badge>
            <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>👑 Customer VIP Tier == True?</div>
          </div>

          <div style={{ color: '#3B82F6', fontSize: '1.2rem', fontWeight: 'bold' }}>↓ (YES)</div>

          {/* Node 3: Action */}
          <div style={{ width: '280px', padding: '0.75rem 1rem', backgroundColor: '#064E3B', border: '2px solid #10B981', borderRadius: '8px', textAlign: 'center' }}>
            <Badge variant="success">ACTION</Badge>
            <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>💬 Send VIP WhatsApp & Slack Alert</div>
          </div>
        </div>

        {/* Right Inspector */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Node Properties</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
            Selected: <strong style={{ color: '#60A5FA' }}>Order Created (&gt; $200)</strong>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>
            Execution Rate: <strong>4,210 triggers / day</strong>
          </div>
        </div>
      </div>

      {/* Execution Logs Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
        <h3 style={{ margin: '1rem', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Recent Execution History Log</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Workflow</th>
              <th style={{ padding: '0.75rem' }}>Trigger Source</th>
              <th style={{ padding: '0.75rem' }}>Duration</th>
              <th style={{ padding: '0.75rem' }}>Time</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {executionLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>{log.workflow}</td>
                <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{log.trigger}</td>
                <td style={{ padding: '0.75rem' }}>{log.duration}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{log.time}</td>
                <td style={{ padding: '0.75rem' }}><Badge variant="success">Success</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
