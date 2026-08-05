/**
 * SynoCommerce Enterprise Visual CMS Page Builder & Theme Studio
 * Webflow, Framer & Shopify Theme Editor Quality Studio
 * @module apps/admin/src/app/cms/page
 */

import React from 'react';
import { AppLayout, Badge, Button } from '../../components/design-system';

export default function AdminCmsBuilderPage() {
  const sectionPalette = [
    { name: 'Hero Banner', icon: '🖼️', category: 'Headers' },
    { name: 'Products Grid', icon: '📦', category: 'Commerce' },
    { name: 'Featured Collection', icon: '🖼️', category: 'Commerce' },
    { name: 'Testimonials & Reviews', icon: '⭐', category: 'Social Proof' },
    { name: 'Countdown Timer', icon: '⏰', category: 'Promotions' },
    { name: 'Newsletter Signup', icon: '📧', category: 'Forms' },
    { name: 'Video Showcase', icon: '🎥', category: 'Media' },
    { name: 'FAQ Accordion', icon: '❓', category: 'Text' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Visual Page Builder & Theme Designer"
      actions={
        <>
          <span style={{ fontSize: '0.85rem', color: '#9CA3AF', marginRight: '1rem' }}>Page: <strong>Homepage (Default)</strong></span>
          <Button variant="secondary">📱 Mobile View</Button>
          <Button variant="secondary">💾 Save Draft</Button>
          <Button variant="primary">🚀 Publish Live</Button>
        </>
      }
    >
      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 320px', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Panel: Sections Palette */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Section Palette</h3>
          <input
            type="text"
            placeholder="Search sections..."
            style={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF', fontSize: '0.8rem', marginBottom: '1rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', flex: 1 }}>
            {sectionPalette.map((s, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.6rem 0.75rem',
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#D1D5DB',
                  cursor: 'grab',
                }}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Visual Canvas */}
        <div style={{ backgroundColor: '#030712', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 1: Hero Banner Card */}
          <div style={{ border: '2px solid #2563EB', borderRadius: '8px', padding: '2rem', backgroundColor: '#111827', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '0.35rem' }}>
              <Badge variant="info">Selected: Hero Banner</Badge>
              <button style={{ backgroundColor: '#374151', color: '#FFF', border: 'none', borderRadius: '4px', padding: '0.2rem 0.4rem', fontSize: '0.75rem', cursor: 'pointer' }}>Duplicate</button>
              <button style={{ backgroundColor: '#991B1B', color: '#FFF', border: 'none', borderRadius: '4px', padding: '0.2rem 0.4rem', fontSize: '0.75rem', cursor: 'pointer' }}>Delete</button>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: '0 0 0.5rem 0' }}>Pure Ayurvedic Wellness & Longevity</h1>
            <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.9rem' }}>Formulated by renowned Vaidyas using organic herbs from Bhilai & Raipur farms.</p>
          </div>

          {/* Section 2: Products Grid Card */}
          <div style={{ border: '1px solid #1F2937', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#111827' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#F3F4F6' }}>Featured Product Grid</h3>
              <Badge variant="success">Active Section</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '1.5rem' }}>🍵</div>
                <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>Triphala Juice 1L</div>
                <div style={{ color: '#10B981', fontWeight: 'bold' }}>$15.00</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '1.5rem' }}>🌿</div>
                <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>Ashwagandha 60s</div>
                <div style={{ color: '#10B981', fontWeight: 'bold' }}>$18.00</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '1.5rem' }}>🍯</div>
                <div style={{ fontWeight: 'bold', color: '#FFF', marginTop: '0.35rem' }}>Chyawanprash 500g</div>
                <div style={{ color: '#10B981', fontWeight: 'bold' }}>$22.50</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Section Inspector */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Section Properties</h3>
          
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>Section Title</label>
              <input type="text" defaultValue="Pure Ayurvedic Wellness" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
            </div>
            <div>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '0.25rem' }}>Background Accent</label>
              <input type="text" defaultValue="#0B0F19 (Dark Obsidian)" style={{ width: '100%', backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.4rem 0.75rem', color: '#FFF' }} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1F2937', paddingTop: '1rem', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9CA3AF' }}>
              <span>SEO Score: <strong style={{ color: '#10B981' }}>98/100</strong></span>
              <span>Accessibility: <strong style={{ color: '#10B981' }}>100%</strong></span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
