module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/*.js'],
  plugins: ['prettier', 'import', 'unused-imports', 'no-eslint-disable', 'immutable'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    'es6': true
  },
  rules: {
    // Eslint native
    'no-duplicate-imports': 'error',

    // Typescript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {functions: false}],
    '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],

    // Prettier
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],

    // Unused imports
    'unused-imports/no-unused-imports': 'error',

    // Unicorn
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-unused-properties': 'off',
    'unicorn/prefer-at': 'error',
    'unicorn/no-array-reduce': 'off',

    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: ['const'], next: '*'},
      {blankLine: 'any', prev: ['const'], next: ['const', 'if']}
    ],

    // Immutable
    'immutable/no-let': 'error',
    'immutable/no-this': 'error',

    // Import rules
    'import/no-relative-parent-imports': 'error',
    'import/group-exports': 'error',

    // No eslint disable
    'no-eslint-disable/no-eslint-disable': 'warn',
  },
};
