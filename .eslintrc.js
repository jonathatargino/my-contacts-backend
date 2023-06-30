module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "always",
    ],
    "class-methods-use-this": 0,
    camelcase: 0,
    "no-unused-vars": ["error", { argsIgnoredPattern: "next" }],
  },
};
