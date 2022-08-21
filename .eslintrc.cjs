/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'google',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'max-len': ['warn', { code: 120 }],
    'require-jsdoc': 0,
  },
};
