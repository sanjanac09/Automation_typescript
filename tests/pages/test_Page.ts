import { expect, Locator, Page } from "@playwright/test";
import { AdminPage } from "./admin_page";

export class tablePage {
    readonly page: Page;
    readonly pageSizeButton: Locator;
    readonly pageSizeOptions: Locator;
    readonly table: Locator;
    readonly headers: Locator;
    readonly firstRow: Locator;
     
    constructor(page: Page) {
    this.page = page;
    // button showing current page size
    this.pageSizeButton = page.getByRole("button", { name: /items/ });
    // options inside the dropdown
    this.pageSizeOptions = page.locator('ul[role="listbox"] >> li'); 
    // locators for table 
    this.table = page.locator("table.MuiTable-root");
    this.headers = this.table.locator("thead th");
    this.firstRow = this.table.locator("tbody tr").first();  
}
 // to get current page size
  async getCurrentPageSize(): Promise<number> {
    const text = await this.pageSizeButton.innerText();
    return parseInt(text); // "10 items" -> 10
  }
 // to get all page size options
  async getPageSizeOptions(): Promise<number[]> {
    await this.pageSizeButton.click(); // open dropdown
    const count = await this.pageSizeOptions.count();
    const options: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.pageSizeOptions.nth(i).innerText();
      options.push(parseInt(text)); // "5" -> 5
    }
    await this.page.keyboard.press("Escape"); // close dropdown
    return options;
  }
 // to change page size
  async changePageSize(size: number) {
    await this.pageSizeButton.click();
    await this.page.getByRole("option", { name: `${size}` }).click();
  }
  //to verify the first row of the table
   async verifyFirstRow(expectedRow: string[]) {
    const cells = this.firstRow.locator("td");
    const count = await cells.count();
    expect(count).toBeGreaterThanOrEqual(expectedRow.length);

    for (let i = 0; i < expectedRow.length; i++) {
      const cellText = await cells.nth(i).innerText();
      expect(cellText.trim()).toBe(expectedRow[i]);
    }
  }
  //to verify header names of the table
   async verifyHeaders(expectedHeaders: string[]) {
    const count = await this.headers.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < expectedHeaders.length; i++) {
      const headerText = await this.headers.nth(i).innerText();
      expect(headerText.trim()).toContain(expectedHeaders[i]); 
      // using contain because some headers have sort icons
    }
  }

}
