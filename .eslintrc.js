module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-undef": 0,
        "indent": 2,
        "semi": 2,
        "no-console": 0,
        "no-unused-vars": 0
    },
    "parserOptions": {
        "sourceType": "module",
    },
    "parser": "babel-eslint",
    "plugins": [
        "flowtype"
    ],
};
