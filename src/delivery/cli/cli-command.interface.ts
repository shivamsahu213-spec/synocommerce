/**
 * CLI Command Contracts
 * @module delivery/cli/cli-command.interface
 */

export interface CliOptionDefinition {
  readonly flag: string;
  readonly description: string;
  readonly required?: boolean | undefined;
  readonly defaultValue?: unknown | undefined;
}

export interface ICliCommand {
  readonly name: string;
  readonly description: string;
  readonly options: readonly CliOptionDefinition[];
  execute(args: Record<string, unknown>): Promise<number>;
}

export interface ICliRegistry {
  registerCommand(command: ICliCommand): void;
  run(commandName: string, args: Record<string, unknown>): Promise<number>;
}
