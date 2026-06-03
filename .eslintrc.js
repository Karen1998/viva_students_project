module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'prettier', // must be last — disables rules that conflict with Prettier
  ],
  rules: {
    // ── Possible problems ────────────────────────────────
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    // ── Best practices ───────────────────────────────────
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'object-shorthand': 'error',
    'no-param-reassign': ['error', { props: false }],

    // ── Style (anything Prettier doesn't cover) ──────────
    'spaced-comment': ['warn', 'always'],
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
