import { InvalidValueObjectError } from '../errors';

/**
 * BCP 47 Locale Value Object.
 */
export class Locale {
  private readonly _tag: string;

  constructor(tag: string) {
    if (!tag || tag.trim().length === 0) {
      throw new InvalidValueObjectError('Locale tag cannot be empty');
    }
    this._tag = tag.trim();
  }

  public get tag(): string {
    return this._tag;
  }

  public equals(other?: Locale): boolean {
    if (!other) return false;
    return this._tag.toLowerCase() === other._tag.toLowerCase();
  }
}
