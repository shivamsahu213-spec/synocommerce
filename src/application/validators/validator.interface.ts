/**
 * Application Validation Contracts
 * @module application/validators/validator.interface
 */

import { ValidationResult } from '../results';
import { ICommand } from '../commands';

export interface IValidator<T> {
  validate(target: T): Promise<ValidationResult>;
}

export interface ICommandValidator<TCommand extends ICommand<unknown>> extends IValidator<TCommand> {}

export interface IRequestValidator<TRequest> extends IValidator<TRequest> {}

export interface IBusinessRuleValidator<TEntity> {
  validateBusinessRule(entity: TEntity): Promise<ValidationResult>;
}
