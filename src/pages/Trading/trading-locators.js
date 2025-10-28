export const tradingLocators = (page) => ({
  tradingLink: page.locator('[data-test-id="header-trading"]'),
  priceInput: page
    .locator('input[id^="base-ui-"]:not([data-cy-test="size"])')
    .first(),
  amountInput: page.locator('input[data-cy-test="size"]').first(),
  sliderWrapper: page.locator(".GA40sV9RbkVyAYUq").first(),
  buyBtn: page.getByRole("button", { name: "Buy BTC" }).first(),
  fixBtn: page.getByRole("button", { name: "Fix It" }),
});
