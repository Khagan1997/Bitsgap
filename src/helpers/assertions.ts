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
  try {
    await expectVisible(locator, name);
    await locator.click();
    await page.waitForURL(URL);
    await expect(page).toHaveURL(URL);
  } catch (error) {
    throw new Error(`Navigation error on ${URL}`);
  }
}

export { expectVisible, navigateToURL };
