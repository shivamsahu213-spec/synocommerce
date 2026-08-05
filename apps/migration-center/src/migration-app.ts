/**
 * Migration Center Application Controller
 * @module apps/migration-center/src/migration-app
 */

import { SynoMigrationEngine } from '@migration/migration-engine';

export class MigrationCenterAppController {
  private engine: SynoMigrationEngine;

  constructor() {
    this.engine = new SynoMigrationEngine();
  }

  public getEngine(): SynoMigrationEngine {
    return this.engine;
  }
}
