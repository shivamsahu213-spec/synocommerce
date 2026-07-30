/**
 * Application Use Case Interface
 * @module application/use-cases/use-case.interface
 */

import { Result } from '../results';
import { ExecutionContext } from '../types';

export interface IUseCase<TInput, TOutput> {
  readonly useCaseName: string;
  execute(input: TInput, context?: ExecutionContext | undefined): Promise<Result<TOutput>>;
}
