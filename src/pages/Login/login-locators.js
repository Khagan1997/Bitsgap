export const loginLocators = (page) => ({
  loginLink: page.locator('span[data-text="Log in"]'),
  emailInput: page.locator("#email"),
  passwordInput: page.locator("#password"),
  loginBtn: page.locator('[data-test="login-form-submit"]'),
});
