/**
 * Infrastructure SMS Adapters
 * @module infrastructure/sms/sms-adapters
 */

import { ISMSPort } from '../../application/ports';
import { Result } from '../../application/results';

export class TwilioSmsAdapter implements ISMSPort {
  public async sendSMS(phoneNumber: string, message: string): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}
