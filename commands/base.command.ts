import { Command } from 'commander';
import { BaseAction } from '@root/actions/base.action';

export abstract class BaseCommand {
  constructor(protected action: BaseAction) {}

  public abstract load(program: Command): void;
}
