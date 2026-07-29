export interface ExtensionPoint<TPayload = unknown> {
  name: string;
  execute(payload: TPayload): Promise<void> | void;
}

export interface ExtensionRegistry {
  register<TPayload>(extension: ExtensionPoint<TPayload>): void;
  list(): ExtensionPoint[];
}
