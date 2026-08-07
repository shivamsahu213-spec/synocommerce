import crypto from 'crypto';
import { hashPassword, comparePassword, hashToken } from '../utils/bcrypt';

export class PasswordService {
  async hash(password: string): Promise<string> {
    return hashPassword(password);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return comparePassword(password, hash);
  }

  generateRandomToken(bytes = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
  }

  hashRandomToken(token: string): string {
    return hashToken(token);
  }
}

export const passwordService = new PasswordService();
