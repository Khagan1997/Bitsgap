import { test as base } from "@playwright/test";
import { Login } from "../pages/Login/Login";

type Fixtures = {
  authenticatedPage: Login;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new Login(page);
    await page.goto("/");
    await loginPage.redirectToLoginPage();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await use(loginPage);
  },
});
