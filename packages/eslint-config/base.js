const eslint = require("@eslint/js");
const globals = require("globals");
const turboPlugin = require("eslint-plugin-turbo");
const onlyWarn = require("eslint-plugin-only-warn");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
    eslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
            "only-warn": onlyWarn,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        ignores: ["node_modules/", "dist/", ".next/", ".turbo/"],
    },
];
