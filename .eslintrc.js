module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    path: true
  },
  rules: {
    "linebreak-style": [0],
    quotes: [0],
    "arrow-parens": [0],
    "object-shorthand": [0],
    "comma-dangle": [0],
    "react/prop-types": [0],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "max-len": 120
  },
  extends: "airbnb"
};
