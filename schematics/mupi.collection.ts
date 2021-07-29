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
    {
      name: 'model',
      alias: 'model',
      description: 'Generate a new model for your application',
    },
    {
      name: 'graphql-schema',
      alias: 'graphql-schema',
      description: 'Generate the graphQL schema from the model',
    },
    {
      name: 'apollo-service',
      alias: 'apollo-service',
      description: 'Generate a sample express.js application from the model',
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
