/**
 * Infrastructure Notification Adapters
 * @module infrastructure/notifications/notification-adapters
 */

import { INotificationPort } from '../../application/ports';
import { Result } from '../../application/results';

export class NotificationCenterAdapter implements INotificationPort {
  public async sendNotification(recipientId: string, templateId: string, payload: Record<string, unknown>): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}
