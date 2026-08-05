/**
 * SynoCommerce Security Audit & Compliance Log Studio UI
 * Datadog Audit, Splunk & CloudTrail Quality Telemetry Portal
 * @module apps/admin/src/app/audit/page
 */

import React from 'react';
import { AppLayout, Badge, Button, StatCard } from '../../components/design-system';

export default function AdminAuditPage() {
  const auditLogs = [
    { id: 'LOG-801', actor: 'Shivam Sahu (Super Admin)', action: 'UPDATE_FEATURE_FLAG', resource: 'enable_bhilai_express_checkout', ip: '103.22.14.8 (Bhilai)', time: '2 mins ago', severity: 'INFO' },
    { id: 'LOG-802', actor: 'Ankit Mishra (Store Manager)', action: 'EXPORT_ORDERS_CSV', resource: 'Orders (Bhilai Hub)', ip: '103.22.14.12 (Bhilai)', time: '14 mins ago', severity: 'NOTICE' },
    { id: 'LOG-803', actor: 'SYSTEM_AUTOSAVE', action: 'SNAPSHOT_BACKUP', resource: 'PostgreSQL Main DB', ip: '127.0.0.1 (Local)', time: '1 hour ago', severity: 'INFO' },
    { id: 'LOG-804', actor: 'Unknown Actor', action: 'FAILED_LOGIN_ATTEMPT', resource: 'Admin Login (/login)', ip: '45.142.120.4 (External)', time: '3 hours ago', severity: 'WARNING' },
  ];

  return (
    <AppLayout
      activeTab="dashboard"
      title="Security Audit Trail & Compliance Telemetry"
      actions={
        <>
          <Button variant="secondary">🔍 Filter Logs</Button>
          <Button variant="secondary">📤 Export CSV</Button>
          <Button variant="primary">🛡️ SOC2 Audit Export</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard title="Audit Events Today" value="14,820 Events" variant="info" />
        <StatCard title="Security Alerts" value="1 Warning" variant="warning" />
        <StatCard title="Failed Logins" value="4 Attempts" variant="warning" />
        <StatCard title="Data Exports" value="12 Exports" variant="info" />
        <StatCard title="Log Retention" value="365 Days" variant="success" />
        <StatCard title="Immutable Hash" value="SHA-256 Verified" variant="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 2fr 1fr', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#F3F4F6' }}>Event Severity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#60A5FA', fontWeight: 'bold' }}>ℹ️ Informational</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#F59E0B' }}>⚠️ Security Warnings</div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1F2937', borderRadius: '6px', color: '#EF4444' }}>🚨 Critical Audits</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
                <th style={{ padding: '0.75rem' }}>Timestamp & Actor</th>
                <th style={{ padding: '0.75rem' }}>Action Code</th>
                <th style={{ padding: '0.75rem' }}>Resource Target</th>
                <th style={{ padding: '0.75rem' }}>IP Address</th>
                <th style={{ padding: '0.75rem' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #1F2937' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#F3F4F6' }}>
                    <div>{log.actor}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{log.time}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontFamily: 'monospace' }}>{log.action}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{log.resource}</td>
                  <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{log.ip}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {log.severity === 'WARNING' && <Badge variant="warning">Warning</Badge>}
                    {log.severity === 'NOTICE' && <Badge variant="info">Notice</Badge>}
                    {log.severity === 'INFO' && <Badge variant="neutral">Info</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#F3F4F6' }}>Compliance Status</h3>
          <div style={{ padding: '0.75rem', backgroundColor: '#1F2937', borderRadius: '6px', fontSize: '0.8rem' }}>
            <div style={{ color: '#9CA3AF' }}>Tamper-Evident Hash</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10B981', marginTop: '0.25rem' }}>SHA-256 Merkle Chain</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
