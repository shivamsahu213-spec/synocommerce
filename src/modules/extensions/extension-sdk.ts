/**
 * Developer Extension SDK
 * @module src/modules/extensions/extension-sdk
 */

export class ExtensionSdk {
  private hooksMap = new Map<string, ((...args: any[]) => unknown)[]>();

  public registerHook(hookName: string, callback: (...args: any[]) => unknown): void {
    const existing = this.hooksMap.get(hookName) || [];
    existing.push(callback);
    this.hooksMap.set(hookName, existing);
  }

  public async executeHooks<T = any>(hookName: string, initialValue: T): Promise<T> {
    const callbacks = this.hooksMap.get(hookName) || [];
    let current: any = initialValue;
    for (const cb of callbacks) {
      // Cast to any to allow flexibility
      current = await (cb as any)(current);
    }
    return current as T;
  }

  public registerPaymentExtension(extensionId: string, handler: (...args: any[]) => unknown): void {
    this.registerHook(`payment:${extensionId}`, handler);
  }

  public registerShippingExtension(extensionId: string, handler: (...args: any[]) => unknown): void {
    this.registerHook(`shipping:${extensionId}`, handler);
  }
}
