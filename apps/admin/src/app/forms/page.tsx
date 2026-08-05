/**
 * SynoCommerce Dynamic Form & Survey Visual Builder UI
 * Typeform, Jotform & HubSpot Quality Form Studio
 * @module apps/admin/src/app/forms/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminFormsBuilderPage() {
  const formFields = [
    { name: 'Full Name Input', type: 'TEXT', icon: '📝' },
    { name: 'Email Address', type: 'EMAIL', icon: '📧' },
    { name: 'Phone Number (OTP)', type: 'PHONE', icon: '📱' },
    { name: 'Dosha Self-Assessment Quiz', type: 'RADIO', icon: '🔘' },
    { name: 'Vaidya Prescription Upload', type: 'FILE', icon: '📎' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Dynamic Form & Survey Visual Builder"
      actions={
        <>
          <Button variant="secondary">📱 Mobile Preview</Button>
          <Button variant="secondary">💾 Save Draft</Button>
          <Button variant="primary">🚀 Publish Form</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Active Forms" value="12 Forms" variant="info" />
        <StatCard title="Submissions Today" value="1,420 Submissions" variant="success" />
        <StatCard title="Conversion Rate" value="34.2%" change="+2.4%" variant="success" />
        <StatCard title="Avg Time to Complete" value="1m 42s" variant="success" />
        <StatCard title="Completion Rate" value="92.4%" variant="success" />
        <StatCard title="AI Spam Protection" value="100% Filtered" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.25rem', height: '480px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Form Field Palette</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
            {formFields.map((f, idx) => (
              <div key={idx} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '6px', fontSize: '0.8rem', color: '#D1D5DB', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'grab' }}>
                <span>{f.icon}</span>
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#111827', border: '2px solid #2563EB', borderRadius: '8px' }}>
            <Badge variant="info">Selected Field: Customer Dosha Quiz</Badge>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '0.5rem 0' }}>Vaidya Ayurvedic Wellness Survey</h3>
            <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF', fontSize: '0.85rem' }}>
              Select your primary Dosha consultation interest: Vata / Pitta / Kapha
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Field Properties</h3>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Required: <strong style={{ color: '#10B981' }}>TRUE</strong></div>
        </div>
      </div>
    </AppLayout>
  );
}
