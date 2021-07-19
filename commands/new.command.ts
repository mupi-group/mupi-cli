import { Command } from 'commander';
import Table from 'cli-table3';
import chalk from 'chalk';
import { BaseCommand } from '@root/commands/base.command';
import { Input } from '@root/commands/command.input';

export class NewCommand extends BaseCommand {
  public load(program: Command) {
    program
      .command('new [name]')
      .description('create a mupi project')
      .option(
        '-s, --service [service]',
        `
Default cloud service you want to choose(aws by default)\n
${NewCommand.buildServiceDescriptionAsTable([
    { name: 'aws', alias: 'amazon' },
    // { name: 'ali', alias: 'aliyun' },
    // { name: 'azure', alias: 'microsoft' },
  ])}\n
`,
      )
      .action(async (name: string, command: { [key: string]: any }) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        const availableServices = ['aws', 'azure', 'ali', 'amazon', 'aliyun', 'microsoft'];

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
          value: command.service ? command.service : 'aws',
        });

        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }

  private static buildServiceDescriptionAsTable(list: { name: string, alias: string }[]): string {
    const leftMargin = '    ';
    const tableConfig = {
      head: ['name', 'alias'],
      chars: {
        left: leftMargin.concat('│'),
        'top-left': leftMargin.concat('┌'),
        'bottom-left': leftMargin.concat('└'),
        mid: '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': '',
      },
    };
    const table: any = new Table(tableConfig);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of list) {
      table.push([
        chalk.green(item.name),
        chalk.cyan(item.alias),
      ]);
    }
    return table.toString();
  }
}
