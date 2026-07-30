import { AggregateRoot, Identifier, Slug, SeoMetadata } from '../..';
import { ICategory } from '../contracts';
import { InvalidCategoryParentError } from '../errors';

export interface CategoryProps {
  name: string;
  slug: Slug;
  parentId?: Identifier | undefined;
  displayOrder?: number | undefined;
  seo?: SeoMetadata | undefined;
}

export class CategoryAggregate extends AggregateRoot<Identifier> implements ICategory {
  private _name: string;
  private _slug: Slug;
  private _parentId?: Identifier | undefined;
  private _displayOrder: number;
  private _seo?: SeoMetadata | undefined;

  constructor(id: Identifier, props: CategoryProps) {
    super(id);
    this._name = props.name;
    this._slug = props.slug;
    this._parentId = props.parentId;
    this._displayOrder = props.displayOrder ?? 0;
    this._seo = props.seo;
  }

  public get name(): string { return this._name; }
  public get slug(): Slug { return this._slug; }
  public get parentId(): Identifier | undefined { return this._parentId; }
  public get displayOrder(): number { return this._displayOrder; }
  public get seo(): SeoMetadata | undefined { return this._seo; }

  public updateParent(newParentId?: Identifier): void {
    if (newParentId && newParentId.equals(this._id)) {
      throw new InvalidCategoryParentError('Category cannot be its own parent');
    }
    this._parentId = newParentId;
  }
}
