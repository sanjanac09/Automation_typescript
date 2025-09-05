import {Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";
import { AdminPage } from "../pages/admin_page";


import { tablePage as TablePage } from "../pages/test_Page";

let tablePage: TablePage;
Given('I am logged in and on the dashboard page of bahah', { timeout: 100000 }, async function () {
  tablePage = new TablePage(this.page); // Initialize the page object
  await tablePage.page.goto('https://bahah.au/login'); // Navigate to login page
});

When('I click on the "Admin users" section', async function () {
  await tablePage.page.getByRole('link', { name: 'Admin Users' }).click();
});

Then('I should be navigated to the admin page', async function () {
  await expect(tablePage.page).toHaveURL(/.*\/admin-users/);
}); 

Then('I should see the title as "Admin Users"', async function () {
  const title = tablePage.page.getByRole('heading', { name: 'Admin Users' });
  await expect(title).toBeVisible();
});

Then('I should see the "Add New user" button', async function () {
  const addButton = tablePage.page.getByRole('button', { name: 'Add New user' });
  await expect(addButton).toBeVisible();
}); 

Then('I should see the table with headers', async function () {
  await expect(tablePage.table).toBeVisible();
  const expectedHeaders = ['Name', 'Email', 'Contact Number', 'Status', 'Actions'];
  await tablePage.verifyHeaders(expectedHeaders);
}); 

Then("The default page size should be {int}", async function (this: CustomWorld, expectedSize: number) {
  tablePage = new TablePage(this.page!);
  const currentSize = await tablePage.getCurrentPageSize();
  if (currentSize !== expectedSize) throw new Error(`Expected ${expectedSize}, but got ${currentSize}`);
});

Then("",async function)

Then("I should see a page size dropdown", async function (this: CustomWorld) {
  const isVisible = await tablePage.pageSizeButton.isVisible();
  if (!isVisible) throw new Error("Page size dropdown is not visible");
});

Then("the page size options should be:", async function (this: CustomWorld, dataTable) {
  const expectedOptions = dataTable.raw()[0].map(Number); // ["5","10","15"] -> [5,10,15]
  const options = await tablePage.getPageSizeOptions();
  expect(options).toEqual(expectedOptions);
});

When("I change page size to {int}", async function (this: CustomWorld, size: number) {
  await tablePage.changePageSize(size);
});

Then("I should see {int} rows in the table", async function (this: CustomWorld, expectedCount: number) {
  await tablePage.verifyFirstRow([]);
});
                                          