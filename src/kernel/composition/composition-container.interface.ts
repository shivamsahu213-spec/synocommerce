/**
 * Module Composer Contracts
 * @module kernel/composition/composition-container.interface
 */

import { ICommerceModule } from '../modules';
import { IDependencyGraph } from '../dependency-graph';

export interface IModuleComposer {
  compose(modules: readonly ICommerceModule[]): Promise<IDependencyGraph>;
}
