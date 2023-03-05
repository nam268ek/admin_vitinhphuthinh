module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
    'prettier',
    'unicorn',
    'import',
    'jsx-a11y',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    'comma-dangle': [2, 'always-multiline'],
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off', // default
    'unicorn/filename-case': ['error', { cases: { pascalCase: true, camelCase: true } }],
    'import/no-cycle': 'off',
    'unicorn/no-null': 'off',
    'func-names': ['warn', 'as-needed'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'unicorn/no-nested-ternary': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/namespace': 2,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // 'more/no-then': 'warn',
    radix: 'off',
    quotes: [2, 'single'],
    semi: [2, 'always'],
    curly: [2, 'all'],
    'new-cap': 2,
    'no-case-declarations': 0,
    'class-methods-use-this': ['off'],
    'one-var-declaration-per-line': [1, 'initializations'],
    'import/no-extraneous-dependencies': ['off', { devDependencies: false }],
    'eslint-disable @typescript-eslint/no-explicit-any': 'off',
    'function-call-argument-newline': ['error', 'consistent'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'require-await': [0, 'consistent'],
    'unicorn/numeric-separators-style': 'off',
    'no-prototype-builtins': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
