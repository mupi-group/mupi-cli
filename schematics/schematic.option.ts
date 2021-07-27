import { strings } from '@angular-devkit/core';

export class SchematicOption {
  constructor(private name: string, private value: boolean | string | any) {}

  public toCommandString(): string {
    if (this.value && this.value.length && typeof this.value !== 'string') {
      return `--${this.name}=${JSON.stringify(this.value)}`;
    }

    if (typeof this.value === 'string') {
      if (this.name === 'name') {
        return `--${this.name}=${this.format()}`;
      }

      if (this.name === 'version' || this.name === 'path') {
        return `--${this.name}=${this.value}`;
      }

      return `--${this.name}="${this.value}"`;
    }

    const str = strings.dasherize(this.name);
    return this.value ? `--${str}` : `--no-${str}`;
  }

  private format() {
    return strings
      .dasherize(this.value as string)
      .split('')
      .reduce((content: any, char: string) => {
        if (char === '(' || char === ')' || char === '[' || char === ']') {
          return `${content}\\${char}`;
        }
        return `${content}${char}`;
      }, '');
  }
}
