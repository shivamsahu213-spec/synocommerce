/**
 * Application Mapper Interfaces
 * @module application/mappers/mapper.interface
 */

export interface IMapper<TSource, TTarget> {
  map(source: TSource): TTarget;
}

export interface IBidirectionalMapper<TSource, TTarget> extends IMapper<TSource, TTarget> {
  mapReverse(target: TTarget): TSource;
}

export interface IDomainToDtoMapper<TDomainEntity, TDto> extends IMapper<TDomainEntity, TDto> {}
export interface IDtoToDomainMapper<TDto, TDomainEntity> extends IMapper<TDto, TDomainEntity> {}
export interface IDomainToIntegrationEventMapper<TDomainEvent, TIntegrationEvent>
  extends IMapper<TDomainEvent, TIntegrationEvent> {}
