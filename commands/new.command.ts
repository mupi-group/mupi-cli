import { Command } from 'commander';

import { BaseCommand } from '@root/commands/base.command';
import { Input } from '@root/commands/command.input';

export class CreateCommand extends BaseCommand {
  public load(program: Command) {
    program
      .command('new [name]')
      .alias('n')
      .description('create a mupi project')
      .action(async (name: string) => {
        const inputs: Input[] = [];
        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs);
      });
  }
}
