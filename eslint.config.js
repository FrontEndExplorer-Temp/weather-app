import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default [
  js(),
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly' }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'no-unused-vars': 'warn',
      'import/order': ['warn', { newlines-between: 'always' }]
    }
  },
  prettier
]; 