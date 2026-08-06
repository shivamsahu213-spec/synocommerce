/**
 * SynoCommerce Developer CLI Executable Entry Point
 * @module tools/cli
 */

import { SynoCliHandler } from './commands/cli-commands';

export * from './commands/cli-commands';
export * from './doctor/doctor';
export * from './generators/generator-engine';
export * from './packaging/packager';

export function runCli(args: string[] = process.argv.slice(2)): string {
  const handler = new SynoCliHandler();
  return handler.handle(args);
}
