import { test } from "../fixtures/fixture";

test("Place and verify limit order", async ({
  authenticatedPage,
  botPage,
  tradingPage,
}) => {
  await authenticatedPage.page.waitForTimeout(1000);
  await botPage.checkBotModal();
  await botPage.openProfile();
  await botPage.switchToDemoMode();
  await tradingPage.redirectToTradingPage();
  await tradingPage.placeOrder();
});
