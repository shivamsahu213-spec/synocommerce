import { Identifier, Slug } from '../..';

export interface ICategory {
  readonly id: Identifier;
  readonly name: string;
  readonly slug: Slug;
  readonly parentId?: Identifier | undefined;
  readonly displayOrder: number;
}
