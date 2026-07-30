import { InvalidValueObjectError } from '../errors';

/**
 * Immutable Date Range Interval Value Object.
 */
export class DateRange {
  private readonly _startDate: Date;
  private readonly _endDate?: Date | undefined;

  constructor(startDate: Date, endDate?: Date) {
    if (!startDate || isNaN(startDate.getTime())) {
      throw new InvalidValueObjectError('DateRange requires a valid start date');
    }
    if (endDate && isNaN(endDate.getTime())) {
      throw new InvalidValueObjectError('DateRange end date is invalid');
    }
    if (endDate && endDate.getTime() < startDate.getTime()) {
      throw new InvalidValueObjectError('DateRange end date cannot precede start date');
    }

    this._startDate = new Date(startDate.getTime());
    this._endDate = endDate ? new Date(endDate.getTime()) : undefined;
  }

  public get startDate(): Date { return new Date(this._startDate.getTime()); }
  public get endDate(): Date | undefined { return this._endDate ? new Date(this._endDate.getTime()) : undefined; }

  public contains(date: Date): boolean {
    const timestamp = date.getTime();
    if (timestamp < this._startDate.getTime()) return false;
    if (this._endDate && timestamp > this._endDate.getTime()) return false;
    return true;
  }

  public equals(other?: DateRange): boolean {
    if (!other) return false;
    return (
      this._startDate.getTime() === other._startDate.getTime() &&
      (this._endDate?.getTime() ?? null) === (other._endDate?.getTime() ?? null)
    );
  }
}
