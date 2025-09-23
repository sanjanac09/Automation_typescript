import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { CustomWorld } from "../support/world.js";

let loginPage: LoginPage;

// Navigate to login page
Given("User is on the login page",{ timeout: 7000 }, async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

// Valid login
When("User enters valid credentials", async function () {
  await loginPage.login("gorakh@ebpearls.com.au", "Password@1");
});

Then("User should see the dashboard", async function () {
  await expect(loginPage.dashboardHeading).toBeVisible();
});

// Invalid email
When("I enter my invalid email", async function () {
  await loginPage.emailInput.fill("gorakharls.com.au");
});

When("I enter my password", async function () {
  await loginPage.passwordInput.fill("Password@1");
});

//click login button
When("I click the login button", async function () {
  await loginPage.loginButton.click();
});

Then("I should see the error message", { timeout: 20000 },async function () {
 await expect(loginPage.errorEmail).toBeVisible();
});

// Empty email
When("I leave email field empty", async function () {
  await loginPage.emailInput.fill("");
});

Then("I should see the error message for email",{ timeout: 20000 }, async function () {
  await expect(loginPage.emailrequired).toBeVisible();
});

// Empty password
When("I enter my email", async function () {
  await loginPage.emailInput.fill("gorakh@ebpearls.com.au");
});

When("I leave password field empty", async function () {
  await loginPage.passwordInput.fill("");
});

Then("I should see the error message for password", async function () {
 await expect(loginPage.passwordrequired).toBeVisible();
});

// Both empty
Then("I should see error messages for email and password", async function () {
  await expect(loginPage.emailrequired).toBeVisible();
  await expect(loginPage.passwordrequired).toBeVisible();
});

// Wrong password
When("I enter wrong password", async function () {
  await loginPage.passwordInput.fill("WrongPass@1");
});

Then("I should see the error message for wrong password",{ timeout: 20000 }, async function () {
 await expect(loginPage.errormessage.first()).toBeVisible();
});

// Dashboard feature background steps
Given("I am on the login page", { timeout: 7000 }, async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When("I login with valid credentials", async function () {
  await loginPage.login("gorakh@ebpearls.com.au", "Password@1");
});

Then("I should be redirected to the dashboard", async function () {
  await expect(loginPage.dashboardHeading).toBeVisible();
});
