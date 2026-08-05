/**
 * SynoCommerce Visual Automation & Logic Flow Builder Studio UI
 * Shopify Flow, Zapier & n8n Quality Automation Studio
 * @module apps/admin/src/app/automation-builder/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminAutomationBuilderPage() {
  const workflowNodes = [
    { type: 'TRIGGER', title: 'Order Paid (> $200)', status: 'ACTIVE' },
    { type: 'CONDITION', title: 'Customer Is VIP?', status: 'ACTIVE' },
    { type: 'ACTION', title: 'Send VIP WhatsApp & Tag Order', status: 'ACTIVE' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Visual Automation & Logic Flow Builder Studio"
      actions={
        <>
          <Button variant="secondary">🧪 Test Flow</Button>
          <Button variant="secondary">💾 Save Workflow</Button>
          <Button variant="primary">🚀 Deploy Automation</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Automations" value="24 Flows" variant="info" />
        <StatCard title="Executions Today" value="18,420" change="+12.4%" variant="success" />
        <StatCard title="Success Rate" value="99.8%" variant="success" />
        <StatCard title="Failed Runs" value="3 Runs" variant="danger" />
        <StatCard title="Avg Latency" value="42 ms" variant="success" />
        <StatCard title="Tasks Saved (Mo)" value="142 K" variant="info" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Logic Nodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>🛍️ Order Triggers</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>🔀 Decision Branches</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>💬 Multi-Channel Actions</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {workflowNodes.map((n, idx) => (
            <React.Fragment key={idx}>
              <div style={{ width: '280px', padding: '0.75rem 1rem', backgroundColor: '#1E3A8A', border: '2px solid #3B82F6', borderRadius: '8px', textAlign: 'center' }}>
                <Badge variant={n.type === 'TRIGGER' ? 'info' : n.type === 'CONDITION' ? 'warning' : 'success'}>{n.type}</Badge>
                <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem', fontSize: '0.85rem' }}>{n.title}</div>
              </div>
              {idx < workflowNodes.length - 1 && <div style={{ color: '#3B82F6', fontSize: '1.2rem', fontWeight: 'bold' }}>↓</div>}
            </React.Fragment>
          ))}
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Node Inspector</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Status: <strong style={{ color: '#10B981' }}>OPERATIONAL</strong></div>
        </div>
      </div>
    </AppLayout>
  );
}
