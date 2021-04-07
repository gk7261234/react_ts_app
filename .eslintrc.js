module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
      ecmaFeatures: {
          jsx: true
      }
  },
  rules: {
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
      react: {
          version: 'detect'
      }
  }
};