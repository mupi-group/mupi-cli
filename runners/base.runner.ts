import chalk from 'chalk';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import { RUNNER_EXECUTION_ERROR } from '@root/lib/ui/messages';

export class BaseRunner {
  constructor(protected binary: string, protected args: string[] = []) {}

  public async run(
    command: string,
    collect = false,
    cwd: string = process.cwd(),
  ): Promise<null | string> {
    const args: string[] = [command];
    const options: SpawnOptions = {
      cwd,
      stdio: collect ? 'pipe' : 'inherit',
      shell: true,
    };
    return new Promise<null | string>((resolve, reject) => {
      const child: ChildProcess = spawn(
        `${this.binary}`,
        [...this.args, ...args],
        options,
      );
      if (collect) {
        child.stdout!.on('data', (data) => resolve(data.toString().replace(/\r\n|\n/, '')));
      }
      child.on('close', (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          console.error(
            chalk.red(
              RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`),
            ),
          );
          reject();
        }
      });
    });
  }
}
