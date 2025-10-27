export const botLocators = (page) => ({
  botModal: page.locator('[data-test-id="start-new-bot-modal"]'),
  botModalCloseBtn: page.locator('[data-test-id="start-new-bot-modal-close"]'),
  profileBtn: page.locator('[data-test-id="header-settings"]'),
  demoToggle: page.locator(
    'label:has(input[data-test-id="header-settings-demo"])'
  ),
  demoActiveLabel: page.locator('div:has-text("Demo mode")').first(),
});
