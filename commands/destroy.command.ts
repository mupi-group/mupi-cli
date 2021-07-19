import { BaseCommand } from '@root/commands/base.command';
import { Command } from 'commander';
import { join } from 'path';

export class DestroyCommand extends BaseCommand {
  // eslint-disable-next-line class-methods-use-this
  public load(program: Command) {
    program
      .command('destroy [env]')
      .description('destroy terraform infrastructures by mupi')
      .action(async (name: string) => {
        await this.action
          .handle(
            undefined,
            undefined,
            [
              'sh',
              `${join(__dirname, '../', 'bin', 'mupi:destroy.sh')}`,
              name || 'prod',
            ],
          );
      });
  }
}
