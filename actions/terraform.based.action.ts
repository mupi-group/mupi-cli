import { BaseAction } from '@root/actions/base.action';
import { Input } from '@root/commands';
import { BaseRunner } from '@root/runners';
import { TERRAFORM_DOES_NOT_EXIST } from '@root/lib/ui/messages';
import { exec } from 'child_process';

export class TerraformBasedAction extends BaseAction {
  // eslint-disable-next-line class-methods-use-this
  async handle(_: Input[], __: Input[], processes: string[]) {
    const isTerraformExisting = new Promise((resolve, reject) => {
      exec('terraform -h', (e) => {
        if (e) {
          reject();
        }
        resolve('');
      });
    });

    await isTerraformExisting.catch(() => {
      console.error(TERRAFORM_DOES_NOT_EXIST);
      process.exit(1);
    });

    const executor = processes[0];
    const script = processes[1];
    const name = processes[2];
    const root = process.cwd();
    const runner = new BaseRunner(executor, [script, name]);
    await runner.run(root).catch(() => process.exit(1));
  }
}
