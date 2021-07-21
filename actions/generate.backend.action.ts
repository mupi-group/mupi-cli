import {
  PromptModule,
  Answers,
  Question,
  createPromptModule,
} from 'inquirer';

import { BaseAction } from '@root/actions/base.action';
import { Input } from '@root/commands';
import { CREATE_MUPI_MODEL_ASKING, GENERATE_MODEL_FAILED, GENERATE_MODEL_SUCCESSFULLY } from '@root/lib/ui/messages';
import { generateInput } from '@root/lib/questions/questions';
// import { BaseCollection } from '@root/schematics/base.collection';
// import { MupiCollection } from '@root/schematics/mupi.collection';
// import { SchematicOption } from '@root/schematics/schematic.option';
// import { SchematicRunner } from '@root/runners/schematic.runner';
import { resolve } from 'path';
// eslint-disable-next-line import/extensions
import { formatThenResolveMupiModelStructure } from '@mupi/core';
import type { FormattedMupiModelStructure } from '@mupi/core';
import { INFO_PREFIX } from '@root/lib/ui';

export class GenerateBackendAction extends BaseAction {
  public async handle(inputs?: Input[], options?: Input[]): Promise<void> {
    await this.askForMissingInformation(inputs!);
    await this.generateApplicationFiles(inputs!, options!).catch((e) => console.error(e));
  }

  private replaceInputMissingInformation = (
    inputs: Input[],
    answers: Answers,
  ): Input[] => inputs.map(
    // eslint-disable-next-line no-param-reassign,no-return-assign
    (input) => (input.value = input.value !== undefined ? input.value : answers[input.name]),
  );

  private askForMissingInformation = async (inputs: Input[]) => {
    console.info(`${CREATE_MUPI_MODEL_ASKING}\n`);

    const prompt: PromptModule = createPromptModule();
    const nameInput = inputs.find((input) => input.name === 'name');
    if (!nameInput!.value) {
      const message = 'type in the model name';
      const questions = [generateInput('name', message)('sample')];
      const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
      this.replaceInputMissingInformation(inputs, answers);
    }
  };

  private generateApplicationFiles = async (args: Input[], options: Input[]) => {
    try {
      require('ts-node').register();
      const model = require(resolve(process.cwd(), 'model', `${args[0].value as string}.model.ts`));
      const schema:
      FormattedMupiModelStructure | boolean = formatThenResolveMupiModelStructure(model.default);
      if (!schema) throw new Error();
      console.log(GENERATE_MODEL_SUCCESSFULLY);
      console.log(schema);
    } catch (e) {
      console.error(GENERATE_MODEL_FAILED);
    }
    // const collection: BaseCollection = new MupiCollection(new SchematicRunner());
    // await collection.execute('model', args.concat(options).reduce(
    //   (schematicOptions: SchematicOption[], option: Input) => {
    //     schematicOptions.push(new SchematicOption(option.name, option.value));
    //     return schematicOptions;
    //   }, [],
    // ));
    console.info();
  };
}