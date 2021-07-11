export const generateInput = (name: string, message: string) => (defaultAnswer: string): any => ({
  type: 'input',
  name,
  message,
  default: defaultAnswer,
});

export const generateSelect = (
  name: string,
): ((message: string) => (choices: string[]) => any
  ) => (message: string) => (choices: string[]) => ({
  type: 'list',
  name,
  message,
  choices,
});
