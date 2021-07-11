module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-console': 0,
  },
};
