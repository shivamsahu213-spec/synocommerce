/**
 * Visual Page Builder & CMS Document Orchestration Engine
 * @module modules/cms/cms-engine
 */

import { CmsPageDocument, CmsBlockInstance } from './types';

export class CmsDocumentEngine {
  private readonly _pages = new Map<string, CmsPageDocument>();
  private readonly _versionHistory = new Map<string, CmsPageDocument[]>();

  public createPage(pageId: string, slug: string, title: string): CmsPageDocument {
    if (this._pages.has(pageId)) {
      throw new Error(`Page '${pageId}' already exists`);
    }

    const doc: CmsPageDocument = {
      pageId,
      slug,
      title,
      status: 'DRAFT',
      version: 1,
      blocks: [],
      seo: {
        metaTitle: title,
        metaDescription: `Default meta description for ${title}`,
      },
      updatedAt: new Date(),
    };

    this._pages.set(pageId, doc);
    this._versionHistory.set(pageId, [{ ...doc }]);
    return doc;
  }

  public addBlock(pageId: string, block: CmsBlockInstance): CmsPageDocument {
    const doc = this._pages.get(pageId);
    if (!doc) {
      throw new Error(`Page '${pageId}' not found`);
    }

    doc.blocks.push(block);
    doc.updatedAt = new Date();
    return doc;
  }

  public reorderBlocks(pageId: string, fromIndex: number, toIndex: number): CmsPageDocument {
    const doc = this._pages.get(pageId);
    if (!doc) {
      throw new Error(`Page '${pageId}' not found`);
    }

    const [moved] = doc.blocks.splice(fromIndex, 1);
    if (moved) {
      doc.blocks.splice(toIndex, 0, moved);
    }

    doc.updatedAt = new Date();
    return doc;
  }

  public publishPage(pageId: string): CmsPageDocument {
    const doc = this._pages.get(pageId);
    if (!doc) {
      throw new Error(`Page '${pageId}' not found`);
    }

    doc.status = 'PUBLISHED';
    doc.version += 1;
    doc.publishedAt = new Date();

    const history = this._versionHistory.get(pageId) ?? [];
    history.push({ ...doc, blocks: [...doc.blocks] });
    this._versionHistory.set(pageId, history);

    return doc;
  }
}
