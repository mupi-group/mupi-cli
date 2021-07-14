import { BaseRunner } from '@root/runners/base.runner';
import { SchematicOption } from './schematic.option';

export class BaseCollection {
  constructor(protected collection: string, protected runner: BaseRunner) {}

  public async execute(
    name: string,
    options: SchematicOption[],
    extraFlags?: string,
  ) {
    let command = this.buildCommandLine(name, options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;

    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: SchematicOption[]): string {
    return `${this.collection}:${name}${this.buildOptions(options)}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private buildOptions(options: SchematicOption[]): string {
    return options.reduce((line, option) => line.concat(` ${option.toCommandString()}`), '');
  }
}
