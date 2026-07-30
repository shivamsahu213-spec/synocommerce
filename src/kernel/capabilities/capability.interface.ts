/**
 * Commerce Capability Contracts
 * @module kernel/capabilities/capability.interface
 */

export interface ICommerceCapability {
  readonly id: string;
  readonly name: string;
  readonly moduleName: string;
  readonly isAvailable: boolean;
}

export interface ICapabilityRegistry {
  registerCapability(capability: ICommerceCapability): void;
  getCapability(capabilityId: string): ICommerceCapability | undefined;
  hasCapability(capabilityId: string): boolean;
}
