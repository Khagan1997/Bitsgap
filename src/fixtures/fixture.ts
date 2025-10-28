import { test as base } from "@playwright/test";
import { Login } from "../pages/Login/Login";
import { Bot } from "../pages/Bot/Bot";
import { Trading } from "../pages/Trading/Trading";
import * as fs from "fs";

type Fixtures = {
  authenticatedPage: Login;
  botPage: Bot;
  tradingPage: Trading;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new Login(page);
    const storageStatePath = "state.json";
    const useStorage = process.env.USE_STORAGE === "true";

    if (useStorage && fs.existsSync(storageStatePath)) {
      await page.goto(process.env.BOT_PAGE_URL!);
    } else {
      if (fs.existsSync(storageStatePath) && !useStorage) {
        await fs.promises.unlink(storageStatePath);
      }
      await page.goto(process.env.BASE_URL!);
      await loginPage.redirectToLoginPage();
      await loginPage.login(
        process.env.USER_EMAIL!,
        process.env.USER_PASSWORD!
      );
    }
    await use(loginPage);
  },
  botPage: async ({ page }, use) => {
    const botPage = new Bot(page);
    await use(botPage);
  },
  tradingPage: async ({ page }, use) => {
    const tradingPage = new Trading(page);
    await use(tradingPage);
  },
});
