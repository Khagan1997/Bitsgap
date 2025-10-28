import { Page, expect, Locator } from "@playwright/test";
import {
  generateRandomPrice,
  generateRandomVolume,
} from "../../helpers/randomizer";
import { expectVisible } from "../../helpers/assertions";
import { tradingLocators } from "./trading-locators";
import { navigateToURL } from "../../helpers/assertions";

export class Trading {
  private locators;

  constructor(private page: Page) {
    this.locators = tradingLocators(page);
  }

  async redirectToTradingPage() {
    await navigateToURL(
      this.page,
      this.locators.tradingLink,
      "Trading link",
      process.env.TRADING_PAGE_URL!
    );
  }

  private async fixInputAndGetValue(input: Locator, invalidValue: string) {
    // 1. Очистить и ввести некорректное значение
    await input.fill("");
    await input.fill(invalidValue);

    // 2. Ждём появления кнопки "Fix it" рядом с инпутом
    expectVisible(this.locators.fixBtn, "Fix button");

    // 3. Кликаем "Fix it"
    await this.locators.fixBtn.click();

    // 4. Ждём, пока значение в инпуте изменится
    await expect(input).not.toHaveValue(invalidValue, { timeout: 5000 });

    // 5. Получаем исправленное значение
    const fixedValueStr = await input.inputValue();
    const fixedValue = parseFloat(fixedValueStr.replace(/[^0-9.]/g, ""));

    if (isNaN(fixedValue)) {
      throw new Error(
        `Не удалось извлечь число из исправленного значения: ${fixedValueStr}`
      );
    }

    // 6. Очищаем поле для следующего шага
    await input.fill("");

    return fixedValue;
  }

  async getMinMaxViaFixIt(): Promise<{ min: number; max: number }> {
    // Шаг 1: Получаем минимальное значение
    const min = await this.fixInputAndGetValue(this.locators.priceInput, "1");

    // Шаг 2: Получаем максимальное значение
    const max = await this.fixInputAndGetValue(
      this.locators.priceInput,
      "999999999"
    );

    console.log(`Получены границы: min = ${min}, max = ${max}`);
    return { min, max };
  }

  async clickSliderAtPercentage(sliderWrapper: Locator, percentage: number) {
    const box = await sliderWrapper.boundingBox();
    if (!box) throw new Error("Не удалось получить размеры ползунка");

    const x = box.x + (box.width * percentage) / 100;
    const y = box.y + box.height / 2;

    await this.page.mouse.move(x, y);
    await this.page.mouse.down();
    await this.page.mouse.up();
  }

  async placeOrder() {
    const { min, max } = await this.getMinMaxViaFixIt();
    const price = generateRandomPrice(min, max);
    const volumePercentage = generateRandomVolume(10, 60);

    await this.locators.priceInput.fill(price.toString());

    await this.clickSliderAtPercentage(
      this.locators.sliderWrapper,
      volumePercentage
    );
    console.log(`Цена: ${price}, Объём: ${volumePercentage}%`);

    // Кликаем Buy
    await expectVisible(this.locators.buyBtn, "Buy button");
    await this.locators.buyBtn.click();

    console.log(
      `Фактические значения из UI: price=${price}, volume=${volumePercentage}%`
    );
  }
}
