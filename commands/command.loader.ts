import chalk from 'chalk';
import { Command } from 'commander';
import { ERROR_PREFIX } from '@root/lib/ui';

import { CreateCommand } from '@root/commands/create.command';
import { CreateAction } from '@root/actions/create.action';

export class CommandLoader {
  public static load(program: Command): void {
    new CreateCommand(new CreateAction()).load(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Oops, Can't recognize your command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.error(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
