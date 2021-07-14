import { EMOJIS } from '@root/lib/ui/emojis';

export const CREATE_MUPI_PROJECT_ASKING = `${EMOJIS.COFFEE}  mupi-cli will create your project soon...`;
export const CREATE_MUPI_MODULE_ASKING = `${EMOJIS.ZAP}  mupi-cli generate the directory with a startup schema for you.`;
export const RUNNER_EXECUTION_ERROR = (command: string) => `\nFailed to execute command: ${command}`;
