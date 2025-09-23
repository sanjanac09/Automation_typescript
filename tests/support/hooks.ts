import { Before, After, AfterStep, Status } from "@cucumber/cucumber";
import { CustomWorld } from "./world.js";

Before(async function (this: CustomWorld) {
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
