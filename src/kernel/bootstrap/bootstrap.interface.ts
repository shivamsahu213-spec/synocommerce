/**
 * Kernel Bootstrapper Contracts
 * @module kernel/bootstrap/bootstrap.interface
 */

import { ICommerceKernelRuntime } from '../runtime';

export interface IKernelBootstrapper {
  bootstrap(): Promise<ICommerceKernelRuntime>;
}
