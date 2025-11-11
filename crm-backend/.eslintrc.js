module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // This 'project' line is the fix.
    // It tells ESLint to read your tsconfig.json
    // so it understands your project's types.
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // This rule is what was causing your error.
    // The 'project' line above fixes the root cause,
    // but this rule is what flags 'any' types.
    '@typescript-eslint/no-unsafe-call': 'error',
  },
};
