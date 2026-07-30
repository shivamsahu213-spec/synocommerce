/**
 * Mediator Pattern Contracts
 *
 * Dispatches commands, queries, and integration notifications through pipeline behaviors.
 *
 * @module application/mediators/mediator.interface
 */

import { ICommand } from '../commands';
import { IQuery } from '../queries';
import { Result } from '../results';
import { IIntegrationEvent } from '../events';

export interface INotificationHandler<TNotification extends IIntegrationEvent> {
  handle(notification: TNotification): Promise<void>;
}

export interface IMediator {
  send<TResult>(command: ICommand<TResult>): Promise<Result<TResult>>;
  query<TResult>(query: IQuery<TResult>): Promise<Result<TResult>>;
  publish<TNotification extends IIntegrationEvent>(notification: TNotification): Promise<void>;
}
