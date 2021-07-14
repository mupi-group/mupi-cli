import { BaseRunner } from './base.runner';

export class SchematicRunner extends BaseRunner {
  constructor() {
    super('node', [`"${SchematicRunner.findClosestSchematicsBinary()}"`]);
  }

  public static getModulePaths() {
    return module.path;
  }

  public static findClosestSchematicsBinary(): string {
    try {
      return require.resolve(
        '@angular-devkit/schematics-cli/bin/schematics.js',
        { paths: [this.getModulePaths()] },
      );
    } catch {
      throw new Error("'schematics' binary path could not be found!");
    }
  }
}
