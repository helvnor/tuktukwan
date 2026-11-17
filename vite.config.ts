/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { configDefaults } from "vitest/config";
import type { UserConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    tailwindcss(),
    react(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
} as UserConfig);
