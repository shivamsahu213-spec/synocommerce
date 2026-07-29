export interface Serializer {
  serialize<TValue>(value: TValue): string;
  deserialize<TValue>(value: string): TValue;
}
