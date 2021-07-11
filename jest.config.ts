import type { Config } from '@jest/types';

const config: Config.InitialOptions = ({
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)',
  ],
  testEnvironment: 'node',
});

export default config;
