import { Page, Locator, expect } from "@playwright/test";

export default class DashboardPage {
  readonly page: Page;

  readonly dashboardHeading: Locator;
  readonly hairdressersHeading: Locator;
  readonly servicesHeading: Locator;
  readonly revenueCard: Locator;
  readonly commissionCard: Locator;
  readonly totalServiceProviders: Locator;
  readonly totalCustomers: Locator;
  readonly sortButton: Locator;
  readonly sortFirstOption: Locator;
  readonly hairdressersMoreLink: Locator;
  readonly customersMoreLink: Locator;
  readonly customersHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole("heading", { name: "Dashboard" });
    this.hairdressersHeading = page.getByRole("heading", { name: "Hairdressers/Beauticians" });
    this.servicesHeading = page.getByRole("heading", { name: "Services booked" });

    this.revenueCard = page.getByText("Revenue generated");
    this.commissionCard = page.getByText("Commision");
    this.totalServiceProviders = page.getByText("Total Service Providers");
    this.totalCustomers = page.getByText("Total Customers");

    this.sortButton = page.getByRole("button", { name: "Sort" });
    this.sortFirstOption = page.locator("#sort-customized-menu div").first();

    this.hairdressersMoreLink = page.getByRole("link", { name: "+108 more" });
    this.customersMoreLink = page.getByRole("link", { name: "+165 more" });

    this.customersHeading = page.getByRole("heading", { name: "Customers", exact: true });
  }

  async navigate() {
    await this.page.goto("https://stage-cms.bahah.com.au/dashboard");
  }

  async verifyDashboardHeading() {
    await expect(this.dashboardHeading).toBeVisible();
  }

  async verifySummaryCards() {
    await expect(this.revenueCard).toBeVisible();
    await expect(this.commissionCard).toBeVisible();
    await expect(this.totalServiceProviders).toBeVisible();
    await expect(this.totalCustomers).toBeVisible();
  }

  async verifyHairdressersSection() {
    await expect(this.hairdressersHeading).toBeVisible();
    await expect(this.hairdressersMoreLink).toBeVisible();
  }

  async verifyCustomersSection() {
    await expect(this.customersHeading).toBeVisible();
    await expect(this.customersMoreLink).toBeVisible();
  }

  async verifyServicesSection() {
    await expect(this.servicesHeading).toBeVisible();
    await this.sortButton.click();
    await this.sortFirstOption.click(); 
}
}