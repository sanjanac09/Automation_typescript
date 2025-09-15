import { Before, After, AfterAll, AfterStep, Status } from "@cucumber/cucumber";
import { CustomWorld } from "./world";
import { chromium, Browser } from "playwright";

let browser: Browser;

Before(async function (this: CustomWorld) {
  browser = await chromium.launch();
  await this.init();
});

AfterStep(async function (this: CustomWorld, step) {
  if (step.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, "image/png");
  }
});

After(async function (this: CustomWorld) {
  await this.cleanup();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
