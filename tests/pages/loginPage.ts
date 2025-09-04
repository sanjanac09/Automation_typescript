import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  emailInput = this.page.locator('input[placeholder="Enter your email"]');
  passwordInput = this.page.locator('input[placeholder="Password"]');
  loginButton = this.page.locator('button[type="submit"]');
  dashboardHeading = this.page.getByRole("heading", { name: "Dashboard" });

  async navigate() {
    await this.page.goto("https://stage-cms.bahah.com.au/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
