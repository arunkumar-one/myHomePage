module.exports = {
    "parser": "@babel/eslint-parser", // Use Babel parser for parsing JSX
    "plugins": ["react"], // Enable React plugin
    "rules": {
        "react/jsx-uses-react": "error", // Prevent React from being marked as unused
        "react/jsx-uses-vars": "error", // Prevent variables used in JSX to be marked as unused
        "react/jsx-wrap-multilines": ["error", { "declaration": false, "assignment": false }] // Do not wrap JSX multiline elements in parentheses
    }
};