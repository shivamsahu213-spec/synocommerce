/**
 * SynoCommerce AI Prompt Engineering & System Instructions Studio UI
 * OpenAI Playground & Anthropic Workbench Quality Prompt Studio
 * @module apps/admin/src/app/prompt-studio/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminPromptStudioPage() {
  const systemPrompts = [
    { name: 'Senior Vaidya AI Assistant', model: 'GPT-4o Enterprise', temp: '0.2', status: 'PRODUCTION' },
    { name: 'Product Description Generator', model: 'Claude 3.5 Sonnet', temp: '0.7', status: 'PRODUCTION' },
    { name: 'Bhilai Inventory Forecaster', model: 'Holt-Winters + GPT-4o', temp: '0.1', status: 'PRODUCTION' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="AI Prompt Engineering & System Instructions Studio"
      actions={
        <>
          <Button variant="secondary">🧪 Test Prompt</Button>
          <Button variant="secondary">💾 Save Version</Button>
          <Button variant="primary">🚀 Deploy to Copilot</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Prompts" value="14 Prompts" variant="info" />
        <StatCard title="Prompt Evaluations" value="142,000 / mo" variant="success" />
        <StatCard title="Avg Latency" value="220 ms" variant="success" />
        <StatCard title="Token Consumption" value="4.2M Tokens" variant="info" />
        <StatCard title="Accuracy Score" value="98.4%" variant="success" />
        <StatCard title="Hallucination Guard" value="100% Enforced" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Prompt Library</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            {systemPrompts.map((p, idx) => (
              <div key={idx} style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>
                <div style={{ fontWeight: 'bold', color: '#60A5FA' }}>{p.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{p.model}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}>
            <Badge variant="info">System Instructions Prompt</Badge>
            <textarea
              defaultValue="You are Antigravity Senior Vaidya AI Assistant for SynoCommerce. Respond with verified Ayurvedic formulation guidance based on Bhilai & Raipur inventory telemetry."
              style={{ width: '100%', height: '180px', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', padding: '0.75rem', color: '#FFF', fontSize: '0.85rem', marginTop: '0.75rem', fontFamily: 'monospace' }}
            />
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Model Parameters</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Temperature: <strong style={{ color: '#10B981' }}>0.2 (Precise)</strong></div>
        </div>
      </div>
    </AppLayout>
  );
}
