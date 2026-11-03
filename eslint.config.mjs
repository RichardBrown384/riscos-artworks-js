import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['packages/**/*.ts'],
    ignores: ['**/dist/**'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      ecmaVersion: 2023,
    },
  },
  {
    files: ['apps/**/*.{ts,tsx}'],
    ignores: ['**/dist/**'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      ecmaVersion: 2023,
      globals: globals.browser,
    },
  },
  {
    files: ['scripts/**/*.mts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      ecmaVersion: 2023,
      globals: globals.node,
    },
  },
]);
