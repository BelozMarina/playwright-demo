// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'playwright-report/**',
      'test-results/**',
      'node_modules/**',
      'dist/**',
      '*.config.js',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Customize Playwright rules
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/no-commented-out-tests': 'warn',
      // ...
    },
  }
);
