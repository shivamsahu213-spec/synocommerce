export interface CategoryNode {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly children: readonly CategoryNode[];
}
