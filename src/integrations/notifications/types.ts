/**
 * Enterprise Communication & Notification Platform Types
 * @module src/integrations/notifications/types
 */

export type EmailProviderType = 'RESEND' | 'SES' | 'SENDGRID' | 'MAILGUN' | 'SMTP';
export type SmsProviderType = 'TWILIO' | 'MSG91' | 'TEXTLOCAL' | 'SNS';
export type WhatsappProviderType = 'META_WHATSAPP' | 'TWILIO_WHATSAPP';
export type PushProviderType = 'FCM' | 'APNS' | 'WEB_PUSH';

export type NotificationChannel = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';
export type NotificationPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export type NotificationTemplateType =
  | 'ORDER_CONFIRMATION'
  | 'ORDER_SHIPPED'
  | 'ORDER_DELIVERED'
  | 'REFUND_CONFIRMATION'
  | 'PASSWORD_RESET'
  | 'EMAIL_VERIFICATION'
  | 'INVOICE'
  | 'ABANDONED_CART'
  | 'OTP'
  | 'MARKETING';

export interface EmailDispatchPayload {
  to: string;
  subject: string;
  htmlBody: string;
  textBody?: string | undefined;
  attachments?: { filename: string; content: string }[] | undefined;
  providerPreference?: EmailProviderType | undefined;
  locale?: string | undefined;
}

export interface SmsDispatchPayload {
  toPhone: string;
  message: string;
  dltTemplateId?: string | undefined;
  providerPreference?: SmsProviderType | undefined;
}

export interface WhatsappDispatchPayload {
  toPhone: string;
  templateName: string;
  components?: any[] | undefined;
  mediaUrl?: string | undefined;
  providerPreference?: WhatsappProviderType | undefined;
}

export interface PushDispatchPayload {
  deviceToken: string;
  title: string;
  body: string;
  data?: Record<string, string> | undefined;
  providerPreference?: PushProviderType | undefined;
}

export interface NotificationDispatchResult {
  messageId: string;
  channel: NotificationChannel;
  providerUsed: string;
  status: 'SENT' | 'QUEUED' | 'FAILED';
  dispatchedAt: Date;
}

export interface WebhookEventPayload {
  eventId: string;
  channel: NotificationChannel;
  event: 'DELIVERED' | 'BOUNCED' | 'COMPLAINT' | 'OPENED' | 'CLICKED';
  recipient: string;
  timestamp: number;
  signature: string;
}
