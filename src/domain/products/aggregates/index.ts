import { AggregateRoot, Identifier, Slug, SeoMetadata } from '../..';
import { ProductVariantEntity } from '../entities';
import { IProduct } from '../contracts';
import { ProductPublicationState, ProductType } from '../types';
import { InvalidProductStateError } from '../errors';

export interface ProductProps {
  title: string;
  slug: Slug;
  productType?: ProductType;
  state?: ProductPublicationState;
  variants?: ProductVariantEntity[];
  seo?: SeoMetadata;
}

export class ProductAggregate extends AggregateRoot<Identifier> implements IProduct {
  private _title: string;
  private _slug: Slug;
  private _productType: ProductType;
  private _state: ProductPublicationState;
  private _variants: ProductVariantEntity[];
  private _seo?: SeoMetadata;

  constructor(id: Identifier, props: ProductProps) {
    super(id);
    this._title = props.title;
    this._slug = props.slug;
    this._productType = props.productType ?? 'PHYSICAL';
    this._state = props.state ?? 'DRAFT';
    this._variants = props.variants ? [...props.variants] : [];
    this._seo = props.seo;
  }

  public get title(): string { return this._title; }
  public get slug(): Slug { return this._slug; }
  public get productType(): ProductType { return this._productType; }
  public get state(): ProductPublicationState { return this._state; }
  public get variants(): readonly ProductVariantEntity[] { return [...this._variants]; }
  public get seo(): SeoMetadata | undefined { return this._seo; }

  public publish(): void {
    if (this._variants.length === 0) {
      throw new InvalidProductStateError('Cannot publish product without variants');
    }
    this._state = 'PUBLISHED';
  }

  public archive(): void {
    this._state = 'ARCHIVED';
  }
}
