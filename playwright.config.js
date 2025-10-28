import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const useStorage = process.env.USE_STORAGE === "true";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 60000,
  fullyParallel: true,
  retries: 0,
  reporter: [["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    ...(useStorage ? { storageState: "state.json" } : {}),
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
