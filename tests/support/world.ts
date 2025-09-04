import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Declare randomEmail here
  randomEmail!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({  
      headless: false,
       slowMo: 400 ,
       args: ['--start-maximized']
      });
    this.context = await this.browser.newContext(
      {
      viewport: null,                // disables Playwright’s fixed viewport
    }
    );
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
