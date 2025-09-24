import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";
import { AdminPage } from '../pages/admin_page.js';

let adminPage: AdminPage;

Given('I am already logged in and on the dashboard page of bahah', { timeout: 100000 }, async function () {
  adminPage = new AdminPage(this.page);              // Pass page to AdminPage
  await adminPage.gotoLoginPage();                  // Go to login page
  await adminPage.email('sanjana.chaudhary@ebpearls.com');
  await adminPage.enterPassword('Password@1');
  await adminPage.SignInNow();                                                                                                                                                                                             
  await adminPage.dashboard();                     // Wait for dashboard
});

When('I click on the "Admin users" section', async function () {
  await adminPage.gotoAdminSection();
});

When('I click on the "Add New user" button', async function () {
  await adminPage.clickAddNewUser();
});

When('I enter the first name', async function () {
  await adminPage.enterFirstName('Sanjana');
});

When('I enter the last name', async function () {
  await adminPage.enterLastName('Chaudhary');
});

When('I enter the email address', async function (this: CustomWorld) {
  // Store the generated email in Cucumber world to use later
  this.randomEmail = `sanjana_${Math.floor(Math.random() * 100000)}@gmail.com`;
  await adminPage.enterEmail(this.randomEmail);
});

When('I enter the contact number', async function (this: CustomWorld) {
  const randomNumber = `+61 48${Math.floor(100000 + Math.random() * 899999)}`;
  await adminPage.enterContact(randomNumber);
});

When('I click "create new admin" button', async function () {
  await adminPage.submitForm();
});

Then('I should see the toast message and new user added to the admit list',{ timeout: 30000 }, async function (this: CustomWorld) {
  await adminPage.verifyToastMessage();
  await adminPage.VerifyUserAdded(this.randomEmail);  // Verify the user using stored email
  await adminPage.page.waitForTimeout(10000);  
});

Then('I should see the status as "Active"', async function () {
  await adminPage.VerifyStatus(this.randomEmail, 'Active');  // Verify the status using stored email
});

When('I click on the profile icon', async function () {
  await adminPage.clickProfile();
});

When('User click logout button', async function () {
  await adminPage.clickLogout();
});

Then('I should be navigated to login page', async function () {
  await adminPage.VerifyLogout();      // Only check logout here
});


