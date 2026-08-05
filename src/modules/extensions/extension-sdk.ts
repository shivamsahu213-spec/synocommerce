/**
 * Developer Extension SDK
 * @module src/modules/extensions/extension-sdk
 */

export class ExtensionSdk {
  private hooksMap = new Map<string, Function[]>();

  public registerHook(hookName: string, callback: Function): void {
    const existing = this.hooksMap.get(hookName) || [];
    existing.push(callback);
    this.hooksMap.set(hookName, existing);
  }

  public async executeHooks<T = any>(hookName: string, initialValue: T): Promise<T> {
    const callbacks = this.hooksMap.get(hookName) || [];
    let current = initialValue;
    for (const cb of callbacks) {
      current = await cb(current);
    }
    return current;
  }

  public registerPaymentExtension(extensionId: string, handler: Function): void {
    this.registerHook(`payment:${extensionId}`, handler);
  }

  public registerShippingExtension(extensionId: string, handler: Function): void {
    this.registerHook(`shipping:${extensionId}`, handler);
  }
}
