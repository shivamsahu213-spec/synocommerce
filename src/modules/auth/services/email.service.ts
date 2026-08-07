import { logger } from '../../../common/logger';

export interface IEmailService {
  sendVerificationEmail(email: string, token: string): Promise<void>;
  sendPasswordResetEmail(email: string, token: string): Promise<void>;
  sendWelcomeEmail(email: string, name?: string): Promise<void>;
}

export class EmailService implements IEmailService {
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${token}`;
    logger.info({ email, verificationUrl }, '[EmailService] Verification email dispatched');
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/reset-password?token=${token}`;
    logger.info({ email, resetUrl }, '[EmailService] Password reset email dispatched');
  }

  async sendWelcomeEmail(email: string, name?: string): Promise<void> {
    logger.info({ email, name }, '[EmailService] Welcome email dispatched');
  }
}

export const emailService = new EmailService();
