/**
 * Admin Dashboard Media & Storage Control Center
 * @module apps/admin/app/storage/page
 */

import React from 'react';

export default function AdminStoragePage() {
  const mediaFiles = [
    { key: 'products/triphala_1l.webp', size: '245 KB', type: 'WEBP', provider: 'AWS_S3', cdnUrl: 'https://cdn.synocommerce.com/products/triphala_1l.webp', date: '2026-08-05' },
    { key: 'banners/vaidya_consultation.avif', size: '512 KB', type: 'AVIF', provider: 'CLOUDFLARE_R2', cdnUrl: 'https://cdn.synocommerce.com/banners/vaidya_consultation.avif', date: '2026-08-05' },
    { key: 'docs/invoice_spec.pdf', size: '1.2 MB', type: 'PDF', provider: 'GCS', cdnUrl: 'https://cdn.synocommerce.com/docs/invoice_spec.pdf', date: '2026-08-04' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Object Storage & Media Library</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>S3, R2, Cloudinary, GCS, Azure Blob, MinIO & CloudFront CDN</p>
      </header>

      {/* Storage Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Total Storage Used</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>142.8 GB</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Media Assets</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>24,819</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>WebP/AVIF Savings</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>38.4%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>CDN Cache Hit Ratio</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>99.2%</div>
        </div>
      </div>

      {/* Media Browser Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Media Library Browser</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>File Key</th>
              <th style={{ padding: '0.75rem' }}>Format</th>
              <th style={{ padding: '0.75rem' }}>Size</th>
              <th style={{ padding: '0.75rem' }}>Provider</th>
              <th style={{ padding: '0.75rem' }}>CDN Link</th>
            </tr>
          </thead>
          <tbody>
            {mediaFiles.map((file) => (
              <tr key={file.key} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#93C5FD' }}>{file.key}</td>
                <td style={{ padding: '0.75rem' }}>{file.type}</td>
                <td style={{ padding: '0.75rem' }}>{file.size}</td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{file.provider}</td>
                <td style={{ padding: '0.75rem' }}>
                  <a href={file.cdnUrl} target="_blank" rel="noreferrer" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: 'bold' }}>
                    View CDN Asset
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
