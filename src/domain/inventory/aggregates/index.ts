import { AggregateRoot } from '../..';
import { WarehouseIdentifier } from '../value-objects';
import { IWarehouse } from '../contracts';
import { WarehouseType } from '../types';

export class WarehouseAggregate extends AggregateRoot<WarehouseIdentifier> implements IWarehouse {
  private _code: string;
  private _name: string;
  private _warehouseType: WarehouseType;
  private _isActive: boolean;

  constructor(id: WarehouseIdentifier, code: string, name: string, warehouseType: WarehouseType = 'PHYSICAL', isActive = true) {
    super(id);
    this._code = code;
    this._name = name;
    this._warehouseType = warehouseType;
    this._isActive = isActive;
  }

  public get code(): string { return this._code; }
  public get name(): string { return this._name; }
  public get warehouseType(): WarehouseType { return this._warehouseType; }
  public get isActive(): boolean { return this._isActive; }

  public deactivate(): void { this._isActive = false; }
  public activate(): void { this._isActive = true; }
}
