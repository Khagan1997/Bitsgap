import { Page } from "@playwright/test";
import {
  expectVisible,
  expectHidden,
  isVisible,
} from "../../helpers/assertions";
import { botLocators } from "./bot-locators";

export class Bot {
  private locators;

  constructor(private page: Page) {
    this.locators = botLocators(page);
  }

  async checkBotModal() {
    if (await isVisible(this.locators.botModalCloseBtn)) {
      await this.locators.botModalCloseBtn.click();
    }
    await expectHidden(this.locators.botModal, "Bot modal");
  }

  async openProfile() {
    await expectVisible(this.locators.profileBtn, "Profile button");
    await this.locators.profileBtn.click();
    await expectVisible(this.locators.demoToggle, "Demo toggle button");
  }

  async enableDemoMode() {
    const isChecked = await this.locators.demoToggle.isChecked();
    if (!isChecked) {
      await this.locators.demoToggle.click();
    }
    await expectVisible(this.locators.demoActiveLabel, "Demo active label");
  }

  async checkActiveDemoMode(): Promise<boolean> {
    return this.locators.demoActiveLabel.isVisible();
  }
}
