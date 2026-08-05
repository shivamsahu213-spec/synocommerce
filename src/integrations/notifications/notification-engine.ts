/**
 * Enterprise Notification Dispatch Engine & Multi-Channel Fallback Router
 * @module src/integrations/notifications/notification-engine
 */

import { EmailProviderService } from './providers/email-provider';
import { SmsProviderService } from './providers/sms-provider';
import { PushProviderService } from './providers/push-provider';
import { WhatsappProviderService } from './providers/whatsapp-provider';
import {
  EmailDispatchPayload,
  NotificationDispatchResult,
  NotificationPriority,
  NotificationTemplateType,
  SmsDispatchPayload,
} from './types';

export class NotificationEngine {
  private emailService = new EmailProviderService();
  private smsService = new SmsProviderService();
  private whatsappService = new WhatsappProviderService();
  private pushService = new PushProviderService();
  private dlq: any[] = [];

  public renderTemplate(
    template: NotificationTemplateType,
    data: Record<string, any>,
    locale: string = 'en'
  ): { subject: string; body: string } {
    if (template === 'ORDER_CONFIRMATION') {
      return {
        subject: locale === 'hi' ? `ऑर्डर की पुष्टि #${data['orderId']}` : `Order Confirmation #${data['orderId']}`,
        body: `Thank you ${data['customerName']}, your order #${data['orderId']} for ${data['amount']} is confirmed.`,
      };
    }
    return {
      subject: `Notification: ${template}`,
      body: `Notification content for ${data['customerName'] || 'Customer'}.`,
    };
  }

  public async dispatchWithFallback(
    emailPayload: EmailDispatchPayload,
    smsPayload?: SmsDispatchPayload,
    priority: NotificationPriority = 'HIGH'
  ): Promise<NotificationDispatchResult> {
    try {
      // Primary Channel: EMAIL
      return await this.emailService.sendEmail(emailPayload);
    } catch (err) {
      if (smsPayload) {
        // Fallback Channel: SMS
        return await this.smsService.sendSms(smsPayload);
      }
      // Dead Letter Queue
      this.dlq.push({ emailPayload, smsPayload, error: err, timestamp: new Date() });
      throw new Error('NOTIFICATION_FAILED_ALL_CHANNELS');
    }
  }

  public getDlqItems(): any[] {
    return this.dlq;
  }
}
