/// <reference types="vitest/config" />
import tailwind from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  test: {
    globals: true,
    setupFiles: "./vitest.setup.ts",
    // 読み込み対象のテストファイルは、components下のatomsとmolecules, utils以下のテストファイルのみ
    include: ["src/components/**/*.test.{ts,tsx}", "src/utils/**/*.test.ts"],
    environment: "jsdom",
    environmentMatchGlobs: [["utils/**/*.{test,spec}.ts", "node"]],
    exclude: ["**/*.stories.*", "storybook-static/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      //カバレッジ検証に含まれるコンポーネント、関数のスコープ
      include: ["src/components/{atoms,molecules}/**/*.{ts,tsx}", "src/utils/**/*.ts"],
      exclude: ["**/*.test.{ts,tsx}", "**/*.stories.*", "storybook-static/**"]
    }
  }
});
