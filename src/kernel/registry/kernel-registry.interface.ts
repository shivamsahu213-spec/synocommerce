/**
 * Kernel Central Registry Contracts
 * @module kernel/registry/kernel-registry.interface
 */

import { ICapabilityRegistry } from '../capabilities';
import { IExtensionRegistry } from '../extensions';

export interface IKernelRegistry {
  readonly capabilities: ICapabilityRegistry;
  readonly extensions: IExtensionRegistry;
}
