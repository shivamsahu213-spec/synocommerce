import { AggregateRoot, Identifier, Slug, SeoMetadata } from '../..';
import { IBrand } from '../contracts';

export interface BrandProps {
  name: string;
  slug: Slug;
  logoUrl?: string | undefined;
  websiteUrl?: string | undefined;
  isActive?: boolean | undefined;
  seo?: SeoMetadata | undefined;
}

export class BrandAggregate extends AggregateRoot<Identifier> implements IBrand {
  private _name: string;
  private _slug: Slug;
  private _logoUrl?: string | undefined;
  private _websiteUrl?: string | undefined;
  private _isActive: boolean;
  private _seo?: SeoMetadata | undefined;

  constructor(id: Identifier, props: BrandProps) {
    super(id);
    this._name = props.name;
    this._slug = props.slug;
    this._logoUrl = props.logoUrl;
    this._websiteUrl = props.websiteUrl;
    this._isActive = props.isActive ?? true;
    this._seo = props.seo;
  }

  public get name(): string { return this._name; }
  public get slug(): Slug { return this._slug; }
  public get logoUrl(): string | undefined { return this._logoUrl; }
  public get websiteUrl(): string | undefined { return this._websiteUrl; }
  public get isActive(): boolean { return this._isActive; }
  public get seo(): SeoMetadata | undefined { return this._seo; }

  public deactivate(): void {
    this._isActive = false;
  }

  public activate(): void {
    this._isActive = true;
  }
}
