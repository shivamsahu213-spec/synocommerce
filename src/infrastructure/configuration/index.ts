/**
 * Infrastructure Configuration Adapter
 * @module infrastructure/configuration
 */

export interface IInfrastructureConfig {
  readonly env: string;
  readonly databaseUrl?: string | undefined;
  readonly redisUrl?: string | undefined;
}

export class InfrastructureConfigProvider {
  public static getConfig(): IInfrastructureConfig {
    return {
      env: process.env.NODE_ENV || 'development',
      databaseUrl: process.env.DATABASE_URL,
      redisUrl: process.env.REDIS_URL,
    };
  }
}
