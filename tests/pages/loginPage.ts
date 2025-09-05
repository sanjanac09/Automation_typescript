import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly emailrequired: Locator;
  readonly passwordrequired: Locator;
  readonly errorEmail: Locator;
  readonly errormessage:Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('input[placeholder="Enter your email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.dashboardHeading = page.getByRole("heading", { name: "Dashboard" });
    this.emailrequired = page.locator('text=Email is a required field');
    this.passwordrequired = page.locator('text=Password is a required field');
    this.errorEmail = page.locator('text=Email must be a valid email');
    this.errormessage = page.locator("text=Username or Password doesn't match").first();
  }

  async navigate() {
    await this.page.goto("https://stage-cms.bahah.com.au/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

