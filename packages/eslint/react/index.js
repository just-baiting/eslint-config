module.exports = {
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
