import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import esNode from 'eslint-plugin-n';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ts.configs.recommended,
  // TODO: investigate enabling recommendedTypeChecked
  svelte.configs.recommended,
  prettier,
  svelte.configs.prettier,
  {
    plugins: { n: esNode },
    // NOTE: only a small subset of rules are enabled in the overrides below
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Seemingly not defined in `globals.browser`
        ScrollBehavior: 'readonly',
      },
    },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      // emulate default typescript compiler unused var behaviour
      // see: https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
      },
    },
  },
  {
    // Override or add rule settings here, such as:
    // 'svelte/button-has-type': 'error'
    rules: {
      // Default ESLint rules
      // ====================

      // Use `Promise.all` instead of `await` in a for loop for better async performance
      'no-await-in-loop': 'error',
      // Don't allow duplicate imports, because they are yucky
      'no-duplicate-imports': 'error',

      // Node (eslint-plugin-n) rules
      // ============================

      // For bin scripts listed in package.json, require a correct shebang
      'n/hashbang': 'error',
      // Don't concat to __file and __dirname (this is unsafe, use `path.join` instead)
      'n/no-path-concat': 'error',
      // Use `node:` prefix when importing from node standard library modules (they don't exist in
      // some other runtimes)
      'n/prefer-node-protocol': 'error',

      // TODO: add in more overrides as necessary
    },
  },
);
