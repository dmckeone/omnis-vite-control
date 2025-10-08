import { defineConfig, globalIgnores } from "eslint/config"
import pluginVitest from "@vitest/eslint-plugin"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

export default defineConfig(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx}"]
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },
  skipFormatting,

  // Must be last to override above config options
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
)
