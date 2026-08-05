/**
 * SynoCommerce Design System Core Component Library
 * Shopify & Apple Quality Design Tokens & Reusable UI Elements
 * @module apps/admin/src/components/design-system
 */

import React, { ReactNode } from 'react';

// --- Stat & Metric Card ---
export interface StatCardProps {
  title: string;
  value: string;
  change?: string | undefined;
  subtext?: string | undefined;
  variant?: 'default' | 'success' | 'warning' | 'danger' | undefined;
}

export function StatCard({ title, value, change, subtext, variant = 'default' }: StatCardProps) {
  const getBadgeColor = () => {
    if (variant === 'success') return '#10B981';
    if (variant === 'danger') return '#EF4444';
    if (variant === 'warning') return '#F59E0B';
    return '#10B981';
  };

  return (
    <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem' }}>
      <div style={{ color: '#9CA3AF', fontSize: '0.8rem', fontWeight: '500' }}>{title}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#F9FAFB', margin: '0.35rem 0' }}>{value}</div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
          <span style={{ color: getBadgeColor(), fontWeight: 'bold' }}>{change}</span>
          {subtext && <span style={{ color: '#6B7280' }}>{subtext}</span>}
        </div>
      )}
    </div>
  );
}

// --- Badge Component ---
export interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | undefined;
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: '#065F46', text: '#A7F3D0' };
      case 'warning':
        return { bg: '#92400E', text: '#FDE68A' };
      case 'danger':
        return { bg: '#991B1B', text: '#FCA5A5' };
      case 'info':
        return { bg: '#1E40AF', text: '#BFDBFE' };
      default:
        return { bg: '#374151', text: '#E5E7EB' };
    }
  };

  const style = getStyles();
  return (
    <span style={{ backgroundColor: style.bg, color: style.text, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>
      {children}
    </span>
  );
}

// --- Primary & Secondary Button Component ---
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | undefined;
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const getStyle = () => {
    if (variant === 'danger') return { bg: '#DC2626', color: '#FFF', border: 'none' };
    if (variant === 'secondary') return { bg: '#1F2937', color: '#D1D5DB', border: '1px solid #374151' };
    return { bg: '#2563EB', color: '#FFF', border: 'none' };
  };

  const s = getStyle();
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: s.border,
        borderRadius: '6px',
        padding: '0.5rem 1.25rem',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// --- App Layout Wrapper Component ---
export interface AppLayoutProps {
  activeTab: 'dashboard' | 'products' | 'orders' | 'analytics' | 'low-code' | 'migration' | 'search';
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}

export function AppLayout({ activeTab, title, actions, children }: AppLayoutProps) {
  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', display: 'flex' }}>
      {/* Shared Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#111827', borderRight: '1px solid #1F2937', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF' }}>
            S
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F3F4F6' }}>SynoCommerce</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Design System Studio</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a
            href="/dashboard"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: activeTab === 'dashboard' ? '#1F2937' : 'transparent',
              color: activeTab === 'dashboard' ? '#60A5FA' : '#9CA3AF',
              fontWeight: activeTab === 'dashboard' ? '600' : 'normal',
              textDecoration: 'none',
            }}
          >
            📊 Executive Dashboard
          </a>
          <a
            href="/products"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: activeTab === 'products' ? '#1F2937' : 'transparent',
              color: activeTab === 'products' ? '#60A5FA' : '#9CA3AF',
              fontWeight: activeTab === 'products' ? '600' : 'normal',
              textDecoration: 'none',
            }}
          >
            📦 Products & Catalog
          </a>
          <a
            href="/orders"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: activeTab === 'orders' ? '#1F2937' : 'transparent',
              color: activeTab === 'orders' ? '#60A5FA' : '#9CA3AF',
              fontWeight: activeTab === 'orders' ? '600' : 'normal',
              textDecoration: 'none',
            }}
          >
            🛍️ Orders & Shipments
          </a>
          <a href="/analytics" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            📈 Business Intelligence
          </a>
          <a href="/low-code-portal" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🧩 Low-Code App Builder
          </a>
          <a href="/migration-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🚚 Migration Toolkit
          </a>
          <a href="/search-center" style={{ padding: '0.75rem 1rem', borderRadius: '6px', color: '#9CA3AF', textDecoration: 'none' }}>
            🔍 Search & Merchandising
          </a>
        </nav>

        <div style={{ borderTop: '1px solid #1F2937', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
            SS
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#F3F4F6' }}>Shivam Sahu</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Design Architect</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Top Header */}
        <header style={{ height: '64px', borderBottom: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#F3F4F6' }}>{title}</h2>
          {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{actions}</div>}
        </header>

        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>{children}</div>
      </main>
    </div>
  );
}
