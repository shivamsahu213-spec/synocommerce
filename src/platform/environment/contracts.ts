export interface EnvironmentSource {
  get(key: string): string | undefined;
  has(key: string): boolean;
}

export interface SecretProvider {
  getSecret(key: string): Promise<string | null>;
}
