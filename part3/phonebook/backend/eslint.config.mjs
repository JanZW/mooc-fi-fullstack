import js from "@eslint/js";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ['dist/**'],
  },
  {
    files: ["**/*.js"],
    plugins: {
      js,
      '@stylistic/js': stylisticJs,
    },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: globals.node,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    }
  }
]);

