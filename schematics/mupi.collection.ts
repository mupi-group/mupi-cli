import { BaseCollection } from '@root/schematics/base.collection';
import { BaseRunner } from '@root/runners/base.runner';
import { SchematicOption } from './schematic.option';

export interface Schematic {
  name: string;
  alias: string;
  description: string;
}

export class MupiCollection extends BaseCollection {
  private static schematics: Schematic[] = [
    {
      name: 'application',
      alias: 'application',
      description: 'Generate a new application workspace',
    },
  ];

  constructor(runner: BaseRunner) {
    super('@mupi/schematics', runner);
  }

  public async execute(name: string, options: SchematicOption[]) {
    const schematic: string = this.validate(name);
    await super.execute(schematic, options);
  }

  public static getSchematics(): Schematic[] {
    return MupiCollection.schematics;
  }

  // eslint-disable-next-line class-methods-use-this
  private validate(name: string) {
    const schematic = MupiCollection.schematics.find(
      (s) => s.name === name || s.alias === name,
    );

    if (schematic === undefined || schematic === null) {
      throw new Error(
        `Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`,
      );
    }
    return schematic.name;
  }
}
