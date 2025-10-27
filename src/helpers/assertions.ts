import { expect, Locator } from "@playwright/test";

async function expectVisible(locator: Locator, name: string, timeout = 30000) {
  try {
    await expect(locator.last()).toBeVisible({ timeout });
  } catch {
    throw new Error(`❌ "${name}" has not appeared on the screen`);
  }
}

export { expectVisible };
