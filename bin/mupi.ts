#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '@root/package.json';
import { CommandLoader } from '@root/commands';

const bootstrap = () => {
  const program: Command = new Command();

  program.version(version, '-v --version', 'Output the version number of mupi-cli.');
  program.usage('<command> [options]');
  program.helpOption('-h, --help', 'Display help for commands and options.');

  CommandLoader.load(program);

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
