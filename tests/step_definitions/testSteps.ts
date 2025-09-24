import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";
import { expect } from "@playwright/test";

Given(
  "I am logged in and on the dashboard page of bahah",
  { timeout: 100000 },
  async function (this: CustomWorld) {
    await this.adminPage.gotoLoginPage();
    await this.adminPage.email("sanjana.chaudhary@ebpearls.com");
    await this.adminPage.enterPassword("Password@1");
    await this.adminPage.SignInNow();
    await this.adminPage.dashboard();
  }
);

When("I click on the Admin users menu item", async function (this: CustomWorld) {
  await this.tablePage.gotoAdminSection();
});

Then("I should be navigated to the admin page", async function (this: CustomWorld) {
  await this.tablePage.verifyAdminPageURL();
});

Then('I should see the title as "Admin Users"', async function (this: CustomWorld) {
  await this.tablePage.verifyTitle();
});

Then('I should see the "Add New user" button', {timeout:6000},async function (this: CustomWorld) {
  await this.tablePage.verifyAddButton();
});

Then("I should see the search bar", async function (this: CustomWorld) {
  await this.tablePage.verifySearchBar();
});

Then("I should see the table with headers", async function (this: CustomWorld, dataTable) {
  await expect(this.tablePage.table).toBeVisible();
  const expectedHeaders = dataTable.raw()[0]; // extract values from feature table row
  await this.tablePage.verifyHeaders(expectedHeaders);
});


Then("The default page size should be {int}",{timeout:15000},
  async function (this: CustomWorld, expectedSize: number) {
    const currentSize = await this.tablePage.getCurrentPageSize();
    expect(currentSize).toBe(expectedSize);
  }
);

Then("I should see a page size dropdown", async function (this: CustomWorld) {
  await expect(this.tablePage.pageSizeButton).toBeVisible();
});

Then( "the page size options should be:", async function (this: CustomWorld, dataTable) {
    const expectedOptions = dataTable.raw()[0].map(Number);
    const options = await this.tablePage.getPageSizeOptions();
    expect(options).toEqual(expectedOptions);
  }
);

When("I change page size to {int}",{timeout:15000}, async function (this: CustomWorld, size: number) {
  await this.tablePage.changePageSize(size);
});

Then("I should see {int} rows in the table", async function (this: CustomWorld, expectedCount: number) {
  const rows = await this.tablePage.table.locator("tbody tr").count();
  expect(rows).toBe(expectedCount);
});


