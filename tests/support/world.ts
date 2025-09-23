import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { TablePage } from "../pages/test_Page.js";
import { AdminPage } from "../pages/admin_page.js";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  tablePage!: TablePage;
  adminPage!: AdminPage;
  randomEmail!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
  async init() {
    this.browser = await chromium.launch({  
      headless: false,
      slowMo: 500,
      args: ['--start-maximized']
    });
    this.context = await this.browser.newContext({ viewport: null });
    this.page = await this.context.newPage();
    this.tablePage = new TablePage(this.page);
    this.adminPage = new AdminPage(this.page);

  }

  async cleanup() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
export default CustomWorld;
