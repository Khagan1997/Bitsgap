import { test } from "../fixtures/fixture";

test("Place and verify limit order", async ({ authenticatedPage, botPage }) => {
  await authenticatedPage.page.waitForTimeout(1000);
  await botPage.checkBotModal();
  await botPage.openProfile();
  await botPage.enableDemoMode();
  await botPage.checkActiveDemoMode();
});
