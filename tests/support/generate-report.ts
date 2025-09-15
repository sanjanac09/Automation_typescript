import { generate } from "multiple-cucumber-html-reporter";

generate({
  jsonDir: "reports",         // directory where cucumber JSON is stored
  reportPath: "reports/html", // output folder
  pageTitle: "Automation Test Report",
  reportName: "Bahah Automation Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chromium",
      version: "latest"
    },
    device: "Local test machine",
    platform: {
      name: process.platform,
      version: "x64"
    }
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Bahah Admin" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "Regression" },
      { label: "Execution Start Time", value: new Date().toISOString() }
    ]
  }
});
