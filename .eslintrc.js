module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-undef": 0,
        "indent": [ "error", 4 ],
        "linebreak-style": [ "error", "unix" ],
        "semi": [ "error", "always" ],
        "no-console": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",

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
