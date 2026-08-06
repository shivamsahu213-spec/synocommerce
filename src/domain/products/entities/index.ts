import { Dimension,Entity, Identifier, Money, SKU, Weight } from '../..';
import { IProductVariant } from '../contracts';

export interface ProductVariantProps {
  sku: SKU;
  title: string;
  price: Money;
  compareAtPrice?: Money | undefined;
  weight?: Weight | undefined;
  dimension?: Dimension | undefined;
}

export class ProductVariantEntity extends Entity<Identifier> implements IProductVariant {
  private _sku: SKU;
  private _title: string;
  private _price: Money;
  private _compareAtPrice?: Money | undefined;
  private _weight?: Weight | undefined;
  private _dimension?: Dimension | undefined;

  constructor(id: Identifier, props: ProductVariantProps) {
    super(id);
    this._sku = props.sku;
    this._title = props.title;
    this._price = props.price;
    this._compareAtPrice = props.compareAtPrice;
    this._weight = props.weight;
    this._dimension = props.dimension;
  }

  public get sku(): SKU { return this._sku; }
  public get title(): string { return this._title; }
  public get price(): Money { return this._price; }
  public get compareAtPrice(): Money | undefined { return this._compareAtPrice; }
  public get weight(): Weight | undefined { return this._weight; }
  public get dimension(): Dimension | undefined { return this._dimension; }
}
