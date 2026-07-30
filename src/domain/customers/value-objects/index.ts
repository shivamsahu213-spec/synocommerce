import { Identifier } from '../..';

export class CustomerIdentifier extends Identifier {}

export type CustomerStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';
export type CustomerType = 'INDIVIDUAL' | 'BUSINESS' | 'VIP';

export interface CustomerPreferences {
  readonly newsletterSubscribed: boolean;
  readonly preferredLanguage?: string;
  readonly preferredCurrency?: string;
}

export interface CustomerGroup {
  readonly groupId: string;
  readonly name: string;
  readonly code: string;
}

export interface CustomerProfile {
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth?: Date;
  readonly companyName?: string;
  readonly taxId?: string;
}
