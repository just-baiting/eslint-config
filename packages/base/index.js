module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:no-unsanitized/DOM'],
  env: {
    es6: true,
  },
};
