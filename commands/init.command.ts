import { BaseCommand } from '@root/commands/base.command';
import { Command } from 'commander';
import { join } from 'path';

export class InitCommand extends BaseCommand {
  // eslint-disable-next-line class-methods-use-this
  public load(program: Command) {
    program
      .command('init [env]')
      .description('init terraform infrastructures by mupi')
      .action(async (name: string) => {
        await this.action
          .handle(
            undefined,
            undefined,
            [
              'sh',
              `${join(__dirname, '../', 'bin', 'mupi:init.sh')}`,
              name || 'prod',
            ],
          );
      });
  }
}
