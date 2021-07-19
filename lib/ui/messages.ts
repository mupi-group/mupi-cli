import { EMOJIS } from '@root/lib/ui/emojis';
import chalk from 'chalk';

export const CREATE_MUPI_PROJECT_ASKING = `${EMOJIS.COFFEE}  mupi-cli will create your project soon...`;
export const CREATE_MUPI_MODEL_ASKING = `${EMOJIS.ZAP}  mupi-cli generate the directory with a startup schema for you.`;
export const RUNNER_EXECUTION_ERROR = (command: string) => `\nfailed to execute command: ${command}`;
export const TERRAFORM_DOES_NOT_EXIST = `\n${EMOJIS.BOOM}it seems you haven't install ${chalk.red('terraform')} on your computer\nplease make sure you've installed all the prerequisites mupi needed\n`;
