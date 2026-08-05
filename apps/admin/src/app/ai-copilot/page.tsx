/**
 * SynoCommerce Enterprise AI Commerce Copilot UI
 * Shopify Sidekick, Microsoft Copilot & Salesforce Einstein Quality AI Assistant
 * @module apps/admin/src/app/ai-copilot/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminAiCopilotPage() {
  const quickActions = [
    '✨ Generate Product Description',
    '📢 Create Marketing Campaign',
    '📊 Summarize Today\'s Sales',
    '🏬 Forecast Inventory Stockouts',
    '🏷️ Create Discount Code',
    '👥 Analyze VIP Customer LTV',
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="AI Commerce Copilot & Executive Assistant"
      actions={
        <>
          <Button variant="secondary">💬 History</Button>
          <Button variant="secondary">⚙️ AI Settings</Button>
          <Button variant="primary">+ New Conversation</Button>
        </>
      }
    >
      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 300px', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar: Conversation History & Prompts */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Recent Conversations</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Today</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: '600' }}>
              💬 Inventory Forecast for Bhilai
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#D1D5DB' }}>
              💬 Monsoon Promo Conversion
            </div>

            <div style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '1rem' }}>Last 7 Days</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#D1D5DB' }}>
              💬 Vaidya VIP LTV Analysis
            </div>
          </div>
        </div>

        {/* Center: Conversation Canvas */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Quick Actions Bar */}
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1F2937', backgroundColor: '#1F2937', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {quickActions.map((action, idx) => (
              <button key={idx} style={{ backgroundColor: '#111827', color: '#D1D5DB', border: '1px solid #374151', borderRadius: '9999px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {action}
              </button>
            ))}
          </div>

          {/* Conversation Thread Stream */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* User Query Message */}
            <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{ backgroundColor: '#2563EB', color: '#FFF', padding: '0.75rem 1rem', borderRadius: '12px 12px 0 12px', fontSize: '0.875rem' }}>
                Show me inventory alerts and revenue trajectory for Bhilai Central Hub.
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                SS
              </div>
            </div>

            {/* AI Assistant Message */}
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '85%' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', color: '#FFF' }}>
                🤖
              </div>
              <div style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '12px 12px 12px 0', padding: '1rem', fontSize: '0.875rem', color: '#E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <strong>Bhilai Central Hub Inventory & Revenue Telemetry:</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <StatCard title="Bhilai Revenue Today" value="$420,000.00" change="+18.4%" variant="success" />
                  <StatCard title="Warehouse Stock Capacity" value="84% Full" variant="warning" />
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: '#111827', borderRadius: '6px', borderLeft: '3px solid #F59E0B', fontSize: '0.8rem' }}>
                  ⚠️ <strong>Action Recommended:</strong> Kalyan Organic Chyawanprash 500g is down to 120 units in Bhilai. Reorder 1,000 units from Raipur Hub to meet festival demand surge.
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Badge variant="info">⚡ Initiate Transfer</Badge>
                  <Badge variant="success">🏷️ Generate Promo Code</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Prompt Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Ask Copilot anything about sales, products, customers or automation rules..."
              style={{ flex: 1, backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', padding: '0.75rem 1rem', color: '#FFF', fontSize: '0.875rem', outline: 'none' }}
            />
            <Button variant="primary">Send 🚀</Button>
          </div>
        </div>

        {/* Right Sidebar: AI Intelligence & Insights */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Copilot Insights Summary</h3>
          
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Predicted 30-Day Revenue</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>$1,650,000.00</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Active Inventory Alerts</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#F59E0B', marginTop: '0.25rem' }}>42 SKUs Low</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
