/**
 * Visual Page Builder Block Registry & Schema Definition
 * @module modules/cms/block-registry
 */

import { CmsBlockType, CmsBlockInstance } from './types';

export interface BlockDefinition {
  type: CmsBlockType;
  label: string;
  category: 'Layout' | 'Commerce' | 'Ayurvedic & Content' | 'Engagement';
  defaultProps: Record<string, any>;
}

export class CmsBlockRegistry {
  private readonly _definitions = new Map<CmsBlockType, BlockDefinition>();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults(): void {
    this.register({
      type: 'HERO',
      label: 'Hero Banner',
      category: 'Layout',
      defaultProps: { headline: 'Timeless Ayurvedic Wisdom', badgeText: 'Pure Organic', primaryCta: 'Explore' },
    });

    this.register({
      type: 'PRODUCT_GRID',
      label: 'Featured Product Grid',
      category: 'Commerce',
      defaultProps: { categoryFilter: 'All', itemsLimit: 6 },
    });

    this.register({
      type: 'DOCTOR_RECOMMENDATION',
      label: 'Doctor Recommendation Banner',
      category: 'Ayurvedic & Content',
      defaultProps: { doctorName: 'Dr. Vaidya Rajendra Sharma', qualification: 'BAMS, MD Ayurveda' },
    });

    this.register({
      type: 'TRUST_BADGES',
      label: 'Ayurvedic Trust Badges',
      category: 'Engagement',
      defaultProps: { badges: ['100% Organic', 'AYUSH Certified', 'Cruelty Free'] },
    });
  }

  public register(def: BlockDefinition): void {
    this._definitions.set(def.type, def);
  }

  public createDefaultInstance(type: CmsBlockType): CmsBlockInstance {
    const def = this._definitions.get(type);
    if (!def) {
      throw new Error(`Block type '${type}' is not registered`);
    }

    return {
      id: `blk_${type.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: { ...def.defaultProps },
      styles: { paddingTop: '4rem', paddingBottom: '4rem', backgroundColor: '#FDFBF7' },
      isVisible: true,
    };
  }
}
