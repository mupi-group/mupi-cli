import { EMOJIS } from '@root/lib/ui/emojis';
import chalk from 'chalk';
import { ERROR_PREFIX, INFO_PREFIX } from '@root/lib/ui/prefixes';

export const CREATE_MUPI_PROJECT_ASKING = `$\n${INFO_PREFIX} {EMOJIS.COFFEE}  mupi will create your project soon...`;
export const CREATE_MUPI_MODEL_ASKING = `\n${INFO_PREFIX} ${EMOJIS.ZAP}  mupi generate the directory with a startup schema for you.`;
export const GENERATE_MUPI_MODEL_ASKING = `\n${INFO_PREFIX} ${EMOJIS.ZAP}  mupi generate the code via the model you've defined.`;
export const RUNNER_EXECUTION_ERROR = (command: string) => `\n${ERROR_PREFIX} failed to execute command: ${command}`;
export const TERRAFORM_DOES_NOT_EXIST = `\n${ERROR_PREFIX} ${EMOJIS.BOOM}it seems you haven't install ${chalk.red('terraform')} on your computer\n       please make sure you've installed all the prerequisites mupi needed\n`;
export const GENERATE_MODEL_FAILED = `\n${ERROR_PREFIX} model generate failed, please check if you've type in the rightly`;
export const GENERATE_MODEL_SUCCESSFULLY = `\n${INFO_PREFIX} yeah! mupi has found your model input\n       wait for a moment, mupi is generating the code for you`;
