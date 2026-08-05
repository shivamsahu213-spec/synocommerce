/**
 * App Builder Studio Application Types
 * @module apps/app-builder/src/types
 */

export type BuilderMode = 'DESIGN' | 'PREVIEW' | 'CODE' | 'THEME';

export interface DragItem {
  componentType: string;
  defaultProps: Record<string, any>;
}
