#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '@root/package.json';
import { CommandLoader } from '@root/commands';

const bootstrap = () => {
  const program: Command = new Command();

  program.helpOption('-h, --help', 'display help for commands and options.');
  program.version(version, '-v --version', 'Output the version number of mupi-cli.');

  program.usage('<command> [options]');

  CommandLoader.load(program);

  program.command('mupi:init', 'init terraform infrastructures by mupi');
  program.command('mupi:deploy', 'deploy terraform infrastructures by mupi');
  program.command('mupi:destroy', 'destroy terraform infrastructures by mupi');

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
