import { Page } from "@playwright/test";
import { expectVisible } from "../../helpers/assertions";
import { loginLocators } from "./login-locators";
import { navigateToURL } from "../../helpers/assertions";

export class Login {
  private locators;

  constructor(private page: Page) {
    this.locators = loginLocators(page);
  }

  async redirectToLoginPage() {
    await navigateToURL(
      this.page,
      this.locators.loginLink,
      "Login link",
      process.env.LOGIN_PAGE_URL!
    );
  }

  async login(email: string, password: string) {
    await expectVisible(this.locators.emailInput, "Email input");
    await this.locators.emailInput.fill(email);
    await expectVisible(this.locators.emailInput, "Password input");
    await this.locators.passwordInput.fill(password);
    await navigateToURL(
      this.page,
      this.locators.loginBtn,
      "Login button",
      process.env.BOT_PAGE_URL!
    );
  }
}
