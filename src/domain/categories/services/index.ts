import { CategoryNode } from '../types';

export interface ICategoryTreeService {
  buildTree(flatCategories: readonly unknown[]): readonly CategoryNode[];
}
