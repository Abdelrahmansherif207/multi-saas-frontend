const eslint = require("@eslint/js");
const globals = require("globals");
const turboPlugin = require("eslint-plugin-turbo");
const onlyWarn = require("eslint-plugin-only-warn");
const tseslint = require("typescript-eslint");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
            "only-warn": onlyWarn,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                React: true,
                JSX: true,
            },
        },
    },
    {
        ignores: ["node_modules/", "dist/", ".next/", ".turbo/"],
    },
];
