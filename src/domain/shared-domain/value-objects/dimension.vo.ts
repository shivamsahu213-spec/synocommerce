import { LengthUnit } from '../types';
import { InvalidValueObjectError } from '../errors';

/**
 * 3D Physical Dimension Value Object.
 */
export class Dimension {
  private readonly _length: number;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _unit: LengthUnit;

  constructor(length: number, width: number, height: number, unit: LengthUnit) {
    if ([length, width, height].some((val) => !Number.isFinite(val) || val < 0)) {
      throw new InvalidValueObjectError('Dimensions must be non-negative finite numbers');
    }
    this._length = length;
    this._width = width;
    this._height = height;
    this._unit = unit;
  }

  public get length(): number { return this._length; }
  public get width(): number { return this._width; }
  public get height(): number { return this._height; }
  public get unit(): LengthUnit { return this._unit; }

  public get volume(): number {
    return this._length * this._width * this._height;
  }

  public equals(other?: Dimension): boolean {
    if (!other) return false;
    return (
      this._length === other._length &&
      this._width === other._width &&
      this._height === other._height &&
      this._unit === other._unit
    );
  }
}
