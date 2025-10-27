import { Page, expect } from "@playwright/test";
import { expectVisible } from "../../helpers/assertions";
import { loginLocators } from "./login-locators";

export class Login {
  private locators;

  constructor(private page: Page) {
    this.locators = loginLocators(page);
  }

  async redirectToLoginPage() {
    await expectVisible(this.locators.loginLink, "Login link");
    await this.locators.loginLink.click();
    await this.page.waitForURL(process.env.LOGIN_PAGE_URL!);
    await expect(this.page).toHaveURL(process.env.LOGIN_PAGE_URL!);
  }
}
