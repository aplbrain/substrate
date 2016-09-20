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
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "no-unused-vars": 0
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
};
