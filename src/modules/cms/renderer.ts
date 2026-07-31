/**
 * Dynamic Server-Side CMS Component Rendering Engine
 * @module modules/cms/renderer
 */

import { CmsPageDocument, CmsBlockInstance } from './types';

export interface RenderedBlockComponent {
  blockId: string;
  type: string;
  htmlContent: string;
}

export class CmsStorefrontRenderer {
  public renderPage(doc: CmsPageDocument): { pageTitle: string; blocksHtml: RenderedBlockComponent[] } {
    const activeBlocks = doc.blocks.filter((b) => b.isVisible);

    const rendered = activeBlocks.map((block) => this.renderBlock(block));

    return {
      pageTitle: doc.title,
      blocksHtml: rendered,
    };
  }

  private renderBlock(block: CmsBlockInstance): RenderedBlockComponent {
    let html = `<div id="${block.id}" class="cms-block cms-block-${block.type.toLowerCase()}">`;

    switch (block.type) {
      case 'HERO':
        html += `<h1 className="hero-headline">${block.props.headline ?? ''}</h1>`;
        break;
      case 'PRODUCT_GRID':
        html += `<div className="product-grid">Category: ${block.props.categoryFilter ?? 'All'}</div>`;
        break;
      case 'DOCTOR_RECOMMENDATION':
        html += `<div className="doctor-recommendation">${block.props.doctorName ?? ''}</div>`;
        break;
      default:
        html += `<div className="generic-block">${JSON.stringify(block.props)}</div>`;
    }

    html += `</div>`;

    return {
      blockId: block.id,
      type: block.type,
      htmlContent: html,
    };
  }
}
