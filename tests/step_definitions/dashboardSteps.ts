import { Then ,Given,When } from "@cucumber/cucumber";
import DashboardPage from "../pages/dashboardPage.js";
import hairstylistpage from "../pages/hairstylistpage.js";
let dashboard: DashboardPage;
let  hairstylist : hairstylistpage;

Given('I am already logged in and on the dashboard page of bahah',{ timeout: 100000 }, async function () {
  hairstylist = new hairstylistpage(this.page); //  get the page object correctly
  await hairstylist.gotoLoginPage();
  await hairstylist.enterInput('gorakh@ebpearls.com.au','Password@1');
  await hairstylist.dashboard();
});

Then("I should see all summary cards on dashboard", async function () {
  dashboard = new DashboardPage(this.page);
  await dashboard.verifyDashboardHeading();
  await dashboard.verifySummaryCards();
});

Then("I should see services booked section with sort option", async function () {
  await dashboard.verifyServicesSection();
});

Then("I should see hairdressers section with more link", async function () {
  await dashboard.verifyHairdressersSection();
});

Then("I should see customers section with more link", async function () {
  await dashboard.verifyCustomersSection();
});
