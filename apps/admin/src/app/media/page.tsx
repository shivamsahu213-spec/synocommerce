/**
 * SynoCommerce Enterprise Digital Asset Management (DAM) & Media Library UI
 * Shopify Files, Adobe Experience Manager & Cloudinary Quality Media Hub
 * @module apps/admin/src/app/media/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminMediaLibraryPage() {
  const mediaAssets = [
    {
      id: 'MEDIA-001',
      name: 'Triphala_Juice_1L_Front.webp',
      type: 'IMAGE',
      icon: '🖼️',
      resolution: '2400 x 2400',
      size: '1.2 MB',
      format: 'WEBP',
      uploadedBy: 'Shivam Sahu',
      cdnUrl: 'https://cdn.synocommerce.com/assets/triphala-1l.webp',
      usage: 'Used on 4 Product Pages',
    },
    {
      id: 'MEDIA-002',
      name: 'Chyawanprash_Vaidya_Review.mp4',
      type: 'VIDEO',
      icon: '🎥',
      resolution: '1920 x 1080',
      size: '18.4 MB',
      format: 'MP4 (H.264)',
      uploadedBy: 'Ankit Mishra',
      cdnUrl: 'https://cdn.synocommerce.com/assets/chyawanprash-review.mp4',
      usage: 'Used on Homepage Hero Section',
    },
    {
      id: 'MEDIA-003',
      name: 'Kalyan_Brand_Styleguide_2026.pdf',
      type: 'DOCUMENT',
      icon: '📄',
      resolution: 'Vector PDF',
      size: '4.8 MB',
      format: 'PDF',
      uploadedBy: 'Design Team',
      cdnUrl: 'https://cdn.synocommerce.com/assets/styleguide-2026.pdf',
      usage: 'Internal Asset',
    },
    {
      id: 'MEDIA-004',
      name: 'Kumkumadi_Serum_4K_Banner.jpg',
      type: 'IMAGE',
      icon: '🖼️',
      resolution: '3840 x 2160',
      size: '3.1 MB',
      format: 'JPEG',
      uploadedBy: 'Marketing Team',
      cdnUrl: 'https://cdn.synocommerce.com/assets/kumkumadi-4k.jpg',
      usage: 'Used on 2 Collection Pages',
    },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Digital Asset Management (DAM) & Media Library"
      actions={
        <>
          <Button variant="secondary">📁 Create Folder</Button>
          <Button variant="secondary">📥 Import Assets</Button>
          <Button variant="secondary">🤖 AI Image Gen</Button>
          <Button variant="primary">+ Upload Files</Button>
        </>
      }
    >
      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Total Assets" value="1,480 Assets" variant="info" />
        <StatCard title="Images Count" value="1,120 WebP/PNG" variant="info" />
        <StatCard title="Videos Count" value="84 MP4/HLS" variant="info" />
        <StatCard title="Documents Count" value="276 PDFs" />
        <StatCard title="Storage Capacity" value="185GB / 1TB" variant="success" />
        <StatCard title="CDN Bandwidth (Mo)" value="4.2 TB" variant="success" />
      </div>

      {/* 3-Column Studio Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar: Asset Folders */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Asset Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>
              📁 All Assets (1,480)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🖼️ Product Imagery (1,120)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              🎥 Video Reviews (84)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📢 Marketing Banners (140)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#9CA3AF' }}>
              📄 Legal & Styleguides (136)
            </div>
          </div>
        </div>

        {/* Center Panel: Media Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', overflowY: 'auto' }}>
          {mediaAssets.map((asset) => (
            <div key={asset.id} style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{asset.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#F3F4F6', fontSize: '0.9rem' }}>{asset.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{asset.resolution} • {asset.size}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#60A5FA', marginBottom: '0.5rem' }}>{asset.usage}</div>
              </div>

              <div style={{ borderTop: '1px solid #1F2937', paddingTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <Button variant="secondary">Copy CDN URL</Button>
                <Button variant="secondary">Edit Alt Text</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Asset Inspector & SEO */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>CDN & Image Optimization</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>WebP Auto-Compression</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>Active (Saved 68% Size)</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Image SEO Score</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>98 / 100 (Alt Tags Complete)</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
