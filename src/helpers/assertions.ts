import { expect, Locator, Page } from "@playwright/test";

async function expectVisible(locator: Locator, name: string, timeout = 30000) {
  try {
    await expect(locator.last()).toBeVisible({ timeout });
  } catch {
    throw new Error(`❌ "${name}" has not appeared on the screen`);
  }
}

async function navigateToURL(
  page: Page,
  locator: Locator,
  name: string,
  URL: string
) {
  await expectVisible(locator, name);
  await locator.click();
  await page.waitForURL(URL);
  await expect(page).toHaveURL(URL);
}

export { expectVisible, navigateToURL };
