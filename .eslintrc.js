module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
      ecmaFeatures: {
          jsx: true
      }
  },
  rules: {
      "no-use-before-define": "off",
  },
  settings: {
      react: {
          version: 'detect'
      }
  }
};