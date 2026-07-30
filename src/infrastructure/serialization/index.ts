/**
 * Infrastructure Serialization Adapter
 * @module infrastructure/serialization
 */

export interface ISerializer {
  serialize<T>(data: T): string;
  deserialize<T>(payload: string): T;
}

export class JsonSerializerAdapter implements ISerializer {
  public serialize<T>(data: T): string {
    return JSON.stringify(data);
  }
  public deserialize<T>(payload: string): T {
    return JSON.parse(payload) as T;
  }
}
