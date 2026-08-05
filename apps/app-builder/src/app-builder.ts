/**
 * App Builder Studio Application Controller
 * @module apps/app-builder/src/app-builder
 */

import { SynoLowCodeEngine } from '@low-code/low-code-engine';

export class AppBuilderController {
  private engine: SynoLowCodeEngine;

  constructor() {
    this.engine = new SynoLowCodeEngine();
  }

  public getEngine(): SynoLowCodeEngine {
    return this.engine;
  }
}
