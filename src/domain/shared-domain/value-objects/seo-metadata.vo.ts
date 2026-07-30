export interface SeoMetadataProps {
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly openGraphImage?: string;
}

/**
 * Search Engine Optimization Meta Metadata Value Object.
 */
export class SeoMetadata {
  private readonly _props: SeoMetadataProps;

  constructor(props: SeoMetadataProps = {}) {
    this._props = {
      title: props.title ? props.title.trim() : undefined,
      description: props.description ? props.description.trim() : undefined,
      keywords: props.keywords ? [...props.keywords] : [],
      canonicalUrl: props.canonicalUrl ? props.canonicalUrl.trim() : undefined,
      openGraphImage: props.openGraphImage ? props.openGraphImage.trim() : undefined
    };
  }

  public get title(): string | undefined { return this._props.title; }
  public get description(): string | undefined { return this._props.description; }
  public get keywords(): readonly string[] { return this._props.keywords || []; }
  public get canonicalUrl(): string | undefined { return this._props.canonicalUrl; }
  public get openGraphImage(): string | undefined { return this._props.openGraphImage; }

  public equals(other?: SeoMetadata): boolean {
    if (!other) return false;
    return (
      this._props.title === other._props.title &&
      this._props.description === other._props.description &&
      this._props.canonicalUrl === other._props.canonicalUrl &&
      this._props.openGraphImage === other._props.openGraphImage
    );
  }
}
