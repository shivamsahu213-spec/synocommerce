/**
 * Search Center Application Controller
 * @module apps/search-center/src/search-app
 */

import { SynoEnterpriseSearchEngine } from '@enterprise-search/search-engine';

export class SearchCenterAppController {
  private engine: SynoEnterpriseSearchEngine;

  constructor() {
    this.engine = new SynoEnterpriseSearchEngine();
  }

  public getEngine(): SynoEnterpriseSearchEngine {
    return this.engine;
  }
}
