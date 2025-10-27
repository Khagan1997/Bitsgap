import { chromium } from "playwright";
import { Login } from "./src/pages/Login/Login.ts";
import "dotenv/config";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const login = new Login(page);

  try {
    await page.goto(process.env.BASE_URL as string);
    await login.redirectToLoginPage();
    await login.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await context.storageState({ path: "state.json" });
    console.log("The session was successfully saved to state.json");
  } catch (error) {
    throw new Error("The session was not saved");
  }
})();
