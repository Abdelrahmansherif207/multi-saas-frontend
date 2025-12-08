import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import turboPlugin from "eslint-plugin-turbo";
import globals from "globals";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
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
        ignores: [
            "**/node_modules/",
            "**/dist/",
            "**/.next/",
            "**/.turbo/",
            "**/*.config.js",
            "**/*.config.mjs",
        ],
    },
];
