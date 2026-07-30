/**
 * CQRS Command and Query Handler Contracts
 * @module application/handlers/handler.interface
 */

import { ICommand } from '../commands';
import { IQuery } from '../queries';
import { Result } from '../results';

export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult = void> {
  handle(command: TCommand): Promise<Result<TResult>>;
}

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult = unknown> {
  handle(query: TQuery): Promise<Result<TResult>>;
}
