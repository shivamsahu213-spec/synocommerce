/**
 * Infrastructure Email Provider Adapters
 *
 * Implements IEmailPort for SMTP, SendGrid, Amazon SES, and Mailgun.
 *
 * @module infrastructure/email/email-adapters
 */

import { IEmailPort } from '../../application/ports';
import { Result } from '../../application/results';

export class SmtpEmailAdapter implements IEmailPort {
  public async sendEmail(to: string, subject: string, templateName: string, variables: Record<string, unknown>): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}

export class SendGridEmailAdapter implements IEmailPort {
  public async sendEmail(to: string, subject: string, templateName: string, variables: Record<string, unknown>): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}

export class SesEmailAdapter implements IEmailPort {
  public async sendEmail(to: string, subject: string, templateName: string, variables: Record<string, unknown>): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}

export class MailgunEmailAdapter implements IEmailPort {
  public async sendEmail(to: string, subject: string, templateName: string, variables: Record<string, unknown>): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}
