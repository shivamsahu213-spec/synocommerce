/**
 * Extension Point Contracts
 * @module kernel/extensions/extension-point.interface
 */

export interface IExtensionPoint<TContext = unknown> {
  readonly pointId: string;
  readonly moduleName: string;
  extend(handler: (context: TContext) => Promise<TContext>): void;
  execute(initialContext: TContext): Promise<TContext>;
}

export interface IExtensionRegistry {
  registerExtensionPoint(point: IExtensionPoint): void;
  getExtensionPoint<T>(pointId: string): IExtensionPoint<T> | undefined;
}
