/**
 * Module Composer Contracts
 * @module kernel/composition/composition-container.interface
 */

import { IDependencyGraph } from '../dependency-graph';
import { ICommerceModule } from '../modules';

export interface IModuleComposer {
  compose(modules: readonly ICommerceModule[]): Promise<IDependencyGraph>;
}
