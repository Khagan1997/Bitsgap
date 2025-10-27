import { expect, Locator, Page } from "@playwright/test";

async function expectVisible(locator: Locator, name: string, timeout = 10000) {
  try {
    await expect(locator.last()).toBeVisible({ timeout });
  } catch {
    throw new Error(`❌ "${name}" has not appeared on the screen`);
  }
}

async function expectHidden(locator: Locator, name: string, timeout = 10000) {
  try {
    await expect(locator).toBeHidden({ timeout });
  } catch {
    throw new Error(`❌ "${name}" did not disappear from the screen`);
  }
}

async function isVisible(locator: Locator, timeout = 5000) {
  try {
    await locator.waitFor({ state: "visible", timeout });
    return true;
  } catch {
    return false;
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

export { expectVisible, expectHidden, isVisible, navigateToURL };
