/**
 * Application Layer Base Error Hierarchy
 *
 * Distinct from domain errors. Represents workflow, orchestration, validation,
 * authorization, and pipeline failure modes.
 *
 * @module application/errors
 */

export abstract class ApplicationError extends Error {
  public readonly timestamp: Date;

  constructor(
    public readonly code: string,
    message: string,
    public readonly correlationId?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
  }
}

export class UseCaseExecutionError extends ApplicationError {
  constructor(useCaseName: string, reason: string) {
    super('USE_CASE_EXECUTION_FAILED', `Use case '${useCaseName}' failed: ${reason}`);
  }
}

export class ApplicationValidationError extends ApplicationError {
  constructor(message: string, public readonly validationErrors: readonly unknown[] = []) {
    super('APPLICATION_VALIDATION_FAILED', message);
  }
}

export class UnauthorizedApplicationAccessError extends ApplicationError {
  constructor(resource: string, requiredPermission: string) {
    super(
      'UNAUTHORIZED_APPLICATION_ACCESS',
      `Access denied to '${resource}'. Missing permission: '${requiredPermission}'`
    );
  }
}

export class ApplicationResourceNotFoundError extends ApplicationError {
  constructor(resourceName: string, resourceId: string) {
    super('RESOURCE_NOT_FOUND', `${resourceName} with ID '${resourceId}' was not found`);
  }
}

export class ConcurrencyConflictError extends ApplicationError {
  constructor(resourceName: string, resourceId: string) {
    super('CONCURRENCY_CONFLICT', `Concurrency conflict detected for ${resourceName} '${resourceId}'`);
  }
}

export class PipelineExecutionError extends ApplicationError {
  constructor(stage: string, message: string) {
    super('PIPELINE_EXECUTION_FAILED', `Pipeline stage '${stage}' failed: ${message}`);
  }
}
