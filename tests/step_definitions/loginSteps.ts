import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { CustomWorld } from "../support/world";

let loginPage: LoginPage;

Given("User is on the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When("User enters valid credentials", async function (this: CustomWorld) {
  await loginPage.login("gorakh@ebpearls.com.au", "Password@1");
});

Then("User should see the dashboard", async function (this: CustomWorld) {
  await expect(loginPage.dashboardHeading).toBeVisible();
});
