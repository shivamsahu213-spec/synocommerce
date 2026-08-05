/**
 * Storefront Media Viewer & Gallery Page
 * @module apps/storefront/app/media/page
 */

import React from 'react';

export default function StorefrontMediaViewerPage() {
  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F3F4F6', fontFamily: 'sans-serif', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#111827', padding: '2.5rem', borderRadius: '10px', border: '1px solid #1F2937' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#60A5FA' }}>Product Media & Asset Showcase</h1>
        <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Delivered via CloudFront & Cloudflare CDN with WebP/AVIF compression</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '150px', backgroundColor: '#374151', borderRadius: '6px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📷 WebP Image
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Triphala Juice 1L</div>
            <div style={{ color: '#10B981', fontSize: '0.8rem' }}>245 KB (Optimized 35%)</div>
          </div>

          <div style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '150px', backgroundColor: '#374151', borderRadius: '6px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🖼️ AVIF Banner
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Ayurvedic Vaidya Banner</div>
            <div style={{ color: '#10B981', fontSize: '0.8rem' }}>512 KB (Optimized 50%)</div>
          </div>

          <div style={{ backgroundColor: '#1F2937', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '150px', backgroundColor: '#374151', borderRadius: '6px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📄 PDF Certificate
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Ayush Lab Report</div>
            <div style={{ color: '#60A5FA', fontSize: '0.8rem' }}>1.2 MB Signed PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
