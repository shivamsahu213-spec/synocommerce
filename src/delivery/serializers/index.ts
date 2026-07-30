/**
 * Delivery Serializers & Deserializers Contracts
 * @module delivery/serializers
 */

export interface IDeliverySerializer<TInput, TOutput> {
  serialize(data: TInput): TOutput;
}

export interface IDeliveryDeserializer<TInput, TOutput> {
  deserialize(payload: TInput): TOutput;
}
