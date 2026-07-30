/**
 * Application CQRS Command Contracts
 * @module application/commands/command.interface
 */

export interface CommandMetadata {
  readonly commandId: string;
  readonly timestamp: Date;
  readonly correlationId?: string | undefined;
  readonly userId?: string | undefined;
}

export interface ICommand<TResult = void> {
  readonly commandName: string;
  readonly metadata: CommandMetadata;
}
