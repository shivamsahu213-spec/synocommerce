/**
 * Application Validation Contracts
 * @module application/validators/validator.interface
 */

import { ICommand } from '../commands';
import { ValidationResult } from '../results';

export interface IValidator<T> {
  validate(target: T): Promise<ValidationResult>;
}

export interface ICommandValidator<TCommand extends ICommand<unknown>> extends IValidator<TCommand> {}

export interface IRequestValidator<TRequest> extends IValidator<TRequest> {}

export interface IBusinessRuleValidator<TEntity> {
  validateBusinessRule(entity: TEntity): Promise<ValidationResult>;
}
