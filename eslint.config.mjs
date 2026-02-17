import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";
import next from "@next/eslint-plugin-next";

export default [
  // ✅ Ignore common build outputs
  {
    ignores: [
      ".now/**",
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "public/**",
    ],
  },

  // ✅ Base JS rules
  js.configs.recommended,

  // ✅ TypeScript + React + Next
  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
      prettier,
      "@next/next": next,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // --- Core ---
      "no-console": "warn",

      // --- React ---
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // --- Hooks ---
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // --- Next.js ---
      "@next/next/no-html-link-for-pages": "off",

      // --- Unused ---
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "unused-imports/no-unused-imports": "warn",

      // --- Prettier ---
      "prettier/prettier": "warn",
    },
  },
];
