export interface NotificationMessage {
  channel: 'email' | 'sms' | 'push' | 'in-app';
  recipient: string;
  template: string;
  payload?: Record<string, unknown>;
}

export interface NotificationSender {
  send(message: NotificationMessage): Promise<void>;
}
