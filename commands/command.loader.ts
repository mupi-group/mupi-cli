import chalk from 'chalk';
import { Command } from 'commander';
import { ERROR_PREFIX } from '@root/lib/ui';

import { CreateModelCommand } from '@root/commands/create.model.command';
import { CreateModelAction } from '@root/actions/create.model.action';

import { NewCommand } from '@root/commands/new.command';
import { NewAction } from '@root/actions/new.action';
import { InitCommand } from '@root/commands/init.command';
import { TerraformBasedAction } from '@root/actions/terraform.based.action';
import { DestroyCommand } from '@root/commands/destroy.command';
import { DeployCommand } from '@root/commands/deploy.command';
import { GenerateBackendCommand } from '@root/commands/generate.backend.command';
import { GenerateBackendAction } from '@root/actions/generate.backend.action';

export class CommandLoader {
  public static load(program: Command): void {
    new NewCommand(new NewAction()).load(program);
    new CreateModelCommand(new CreateModelAction()).load(program);
    new GenerateBackendCommand(new GenerateBackendAction()).load(program);
    new InitCommand(new TerraformBasedAction()).load(program);
    new DeployCommand(new TerraformBasedAction()).load(program);
    new DestroyCommand(new TerraformBasedAction()).load(program);
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
