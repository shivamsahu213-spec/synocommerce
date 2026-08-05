/**
 * Admin Dashboard Communication & Notification Control Center
 * @module apps/admin/app/notifications/page
 */

import React from 'react';

export default function AdminNotificationsPage() {
  const deliveryReports = [
    { id: 'msg_email_8819', channel: 'EMAIL', provider: 'RESEND', template: 'ORDER_CONFIRMATION', recipient: 'shivam@example.com', status: 'DELIVERED', date: '12:30:15' },
    { id: 'msg_sms_7712', channel: 'SMS', provider: 'TWILIO', template: 'OTP', recipient: '+919988776655', status: 'DELIVERED', date: '12:28:40' },
    { id: 'msg_wa_1102', channel: 'WHATSAPP', provider: 'META_WHATSAPP', template: 'ORDER_SHIPPED', recipient: '+919988776655', status: 'READ', date: '12:15:10' },
  ];

  return (
    <div style={{ backgroundColor: '#0B0F19', color: '#F9FAFB', fontFamily: 'sans-serif', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #1F2937', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#60A5FA', margin: 0 }}>Communication & Notification Center</h1>
        <p style={{ color: '#9CA3AF', margin: '0.25rem 0 0 0' }}>Multi-Channel Engine: Resend, SES, SendGrid, Twilio, Meta WhatsApp, FCM</p>
      </header>

      {/* Provider Health Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Email Delivery Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>99.8%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>SMS Conversion</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3B82F6' }}>98.4%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>WhatsApp Read Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34D399' }}>94.2%</div>
        </div>
        <div style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
          <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Push Click Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B' }}>18.5%</div>
        </div>
      </div>

      {/* Delivery Logs Table */}
      <section style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1F2937' }}>
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1rem', color: '#F3F4F6' }}>Live Dispatch Audit Logs</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #374151', color: '#9CA3AF' }}>
              <th style={{ padding: '0.75rem' }}>Message ID</th>
              <th style={{ padding: '0.75rem' }}>Channel</th>
              <th style={{ padding: '0.75rem' }}>Provider</th>
              <th style={{ padding: '0.75rem' }}>Template</th>
              <th style={{ padding: '0.75rem' }}>Recipient</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveryReports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #1F2937' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#93C5FD' }}>{report.id}</td>
                <td style={{ padding: '0.75rem' }}>{report.channel}</td>
                <td style={{ padding: '0.75rem' }}>{report.provider}</td>
                <td style={{ padding: '0.75rem', color: '#D1D5DB' }}>{report.template}</td>
                <td style={{ padding: '0.75rem', color: '#9CA3AF' }}>{report.recipient}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: '#065F46', color: '#F9FAFB' }}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
