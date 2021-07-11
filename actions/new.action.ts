import {
  PromptModule,
  Answers,
  Question,
  createPromptModule,
} from 'inquirer';

import { BaseAction } from '@root/actions/base.action';
import { Input } from '@root/commands';
import { CREATE_MUPI_PROJECT_ASKING } from '@root/lib/ui/messages';
import { generateInput } from '@root/lib/questions/questions';

export class NewAction extends BaseAction {
  public async handle(inputs?: Input[]): Promise<void> {
    await this.askForMissingInformation(inputs!);
    console.info('This feature is under developing now!');
  }

  private replaceInputMissingInformation = (
    inputs: Input[],
    answers: Answers,
  ): Input[] => inputs.map(
    // eslint-disable-next-line no-param-reassign,no-return-assign
    (input) => (input.value = input.value !== undefined ? input.value : answers[input.name]),
  );

  private askForMissingInformation = async (inputs: Input[]) => {
    console.info(`${CREATE_MUPI_PROJECT_ASKING}\n`);

    const prompt: PromptModule = createPromptModule();
    const nameInput = inputs.find((input) => input.name === 'name');
    if (!nameInput!.value) {
      const message = 'type in the project name';
      const questions = [generateInput('name', message)('sample')];
      const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
      this.replaceInputMissingInformation(inputs, answers);
    }
  };
}
