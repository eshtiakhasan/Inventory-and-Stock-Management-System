// ESLint flat config for the whole monorepo (team Code Style; NFR9.1).
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/** Modules in apps/api/src/modules. Each may use only its own internal/ folder. */
const API_MODULES = ["identity"];

const MIGRATION_PROVIDER =
  "apps/api/src/platform/db/sqlFileMigrationProvider.ts";
const IDS_FILE = "apps/api/src/modules/identity/internal/ids.ts";

const SQL_RAW_BAN = {
  selector:
    "CallExpression[callee.type='MemberExpression'][callee.object.name='sql'][callee.property.name='raw']",
  message:
    "sql.raw is allowed only in the SQL migration provider (NFR1.11). Use Kysely builders or the sql`` tag.",
};

const BUSINESS_ID_CAST_BAN = {
  selector: "TSAsExpression > TSTypeReference[typeName.name='BusinessId']",
  message:
    "BusinessId values are created only by modules/identity/internal/ids.ts (NFR2.1).",
};

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "aidlc/**",
      "_bmad/**",
      "_bmad-output/**",
      "_wds-learn/**",
      "design-artifacts/**",
      "design-process/**",
      "docs/**",
      ".claude/**",
      ".agents/**",
      ".gemini/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-syntax": ["error", SQL_RAW_BAN, BUSINESS_ID_CAST_BAN],
    },
  },
  {
    files: [MIGRATION_PROVIDER],
    rules: { "no-restricted-syntax": ["error", BUSINESS_ID_CAST_BAN] },
  },
  {
    files: [IDS_FILE],
    rules: { "no-restricted-syntax": ["error", SQL_RAW_BAN] },
  },
  // Module boundaries (logical-components.md): code outside a module may not
  // reach into its internal/ folder; modules may not import platform/middleware.
  {
    files: ["apps/api/src/**/*.ts"],
    ignores: ["apps/api/src/modules/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/modules/*/internal", "**/modules/*/internal/**"],
              message:
                "Import a module only through its index.ts (logical-components.md).",
            },
          ],
        },
      ],
    },
  },
  ...API_MODULES.map((moduleName) => ({
    files: [`apps/api/src/modules/${moduleName}/**/*.ts`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "**/modules/*/internal",
                "**/modules/*/internal/**",
                `!**/modules/${moduleName}/internal`,
                `!**/modules/${moduleName}/internal/**`,
              ],
              message:
                "A module may not use another module's internal/ folder.",
            },
            {
              group: ["**/platform/middleware", "**/platform/middleware/**"],
              message: "Modules may not import platform/middleware.",
            },
          ],
        },
      ],
    },
  })),
  {
    files: ["apps/web/src/**/*.{ts,tsx}", "apps/web/test/**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["apps/web/public/**/*.js"],
    languageOptions: { sourceType: "script", globals: { ...globals.browser } },
  },
);
