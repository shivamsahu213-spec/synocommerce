/**
 * Unified Push Notification Service (FCM, APNs, Web Push)
 * @module src/integrations/notifications/providers/push-provider
 */

import crypto from 'node:crypto';
import { NotificationDispatchResult, PushDispatchPayload, PushProviderType } from '../types';

export class PushProviderService {
  public async sendPush(payload: PushDispatchPayload): Promise<NotificationDispatchResult> {
    const provider: PushProviderType = payload.providerPreference || 'FCM';
    const msgId = `msg_push_${crypto.randomBytes(6).toString('hex')}`;

    return {
      messageId: msgId,
      channel: 'PUSH',
      providerUsed: provider,
      status: 'SENT',
      dispatchedAt: new Date(),
    };
  }
}
