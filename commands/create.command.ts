import { Command } from 'commander';
import { BaseCommand } from '@root/commands/base.command';
import { Input } from '@root/commands/command.input';

export class CreateCommand extends BaseCommand {
  public load(program: Command) {
    program
      .command('create [name]')
      .description('create a mupi model for application')
      .option(
        '-e, --env [env]',
        'default deploy env you want to choose(prod by default)',
      )
      .option(
        '-s, --service [service]',
        'default cloud service you want to choose(aws by default)',
      )
      .action(async (name: string, command: { [key: string]: any }) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        const availableServices = [
          'aws',
          'amazon',
        ];

        if (command.service) {
          const lowercaseService = command.service.toLowerCase();
          const serviceMatch = availableServices.includes(lowercaseService);

          if (!serviceMatch) {
            throw new Error(
              `Invalid service "${command.service}" selected."`,
            );
          }

          switch (lowercaseService) {
            case 'amazon':
              // eslint-disable-next-line no-param-reassign
              command.service = 'aws';
              break;
            case 'aliyun':
              // eslint-disable-next-line no-param-reassign
              command.service = 'ali';
              break;
            case 'microsoft':
              // eslint-disable-next-line no-param-reassign
              command.service = 'azure';
              break;
            default:
              // eslint-disable-next-line no-param-reassign
              command.service = 'aws';
              break;
          }
        }

        options.push({
          name: 'service',
          value: command.service || CreateCommand.findClosestMupiConfig().service || 'aws',
        });

        options.push({
          name: 'env',
          value: CreateCommand.findClosestMupiConfig().env || 'prod',
        });

        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }

  private static findClosestMupiConfig(): { env?: string, service?: string } {
    try {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(
        `${process.cwd()}/mupi.json`,
      );
    } catch {
      return {};
    }
  }
}
