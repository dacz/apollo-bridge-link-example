module.exports = {
  extends: 'dacz',
  rules: {
    'no-nested-ternary': 0,
    'compat/compat': 0,
    'no-unused-vars': [2, { argsIgnorePattern: '^_', args: 'after-used' }],
  },
};
