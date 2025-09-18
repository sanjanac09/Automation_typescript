import { expect, Locator, Page } from "@playwright/test";
import { AdminPage } from "./admin_page";

export class TablePage {
    readonly page: Page;
    readonly pageSizeButton: Locator;
    readonly pageSizeOptions: Locator;
    readonly table: Locator;
    readonly headers: Locator;
    readonly firstRow: Locator;
    readonly title: Locator; //for title  
    readonly addButton: Locator; // for add new user button
    readonly searchBar: Locator; // for search bar
     readonly headerFirstName: Locator;
     readonly headerLastName: Locator;
     readonly headerEmail: Locator;
     readonly headerStatus: Locator;
     readonly AdminSection: Locator;
     readonly firstStatusCell: Locator; // for status cell in the first row
     readonly burgerMenuButton: Locator; // for burger menu button in the first row
     readonly menuItems: Locator; // for menu items in the dropdown

     
    constructor(page: Page) {
    this.page = page;
    // button showing current page size
    this.pageSizeButton = page.getByRole("button", { name: /\d+\s+items/i });
    // options inside the dropdown
    this.pageSizeOptions = page.locator('ul[role="listbox"] >> li'); 
    // locators for table 
    this.table = page.locator("table.MuiTable-root");
    this.headers = this.table.locator("thead th");
    this.firstRow = this.table.locator("tbody tr").first();  
    this.title = page.getByRole('heading', { name: 'Admin Users' }); 
    this.addButton = page.getByRole("link", { name: "Add new" });
    this.searchBar = page.locator('input[placeholder="Search"]');

    //for table heades
    this.headerFirstName = page.getByRole("columnheader", { name: "First Name" });
    this.headerLastName = page.getByRole("columnheader", { name: "Last Name" });
    this.headerEmail = page.getByRole("columnheader", { name: "Email" });
    this.headerStatus = page.getByRole("columnheader", { name: "Status" });
    this.AdminSection= page.locator('text=Admin Users');
  
    // for status cell in the first row
    this.firstStatusCell = page.locator("table tbody tr td").nth(4); 
    // adjust nth() to match the correct index of Status column
    this.burgerMenuButton = page.locator(".burger-menu-button").first();
    this.menuItems = page.locator("ul[role='menu'] li");
  }
 // to get current page size
 async getCurrentPageSize(): Promise<number> {
    await expect(this.pageSizeButton).toBeVisible({ timeout: 10000 });
    const text = await this.pageSizeButton.innerText();
    const match = text.match(/\d+/);
    if (!match) throw new Error(`No number found in page size button text: ${text}`);
    return parseInt(match[0]);
  }

 // to get all page size options
async getPageSizeOptions(): Promise<number[]> {
    await this.pageSizeButton.click();
    const count = await this.pageSizeOptions.count();
    const options: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.pageSizeOptions.nth(i).innerText(); // "5 rows"
      const match = text.match(/\d+/);
      if (match) options.push(parseInt(match[0]));
    }
    await this.page.keyboard.press("Escape"); // close dropdown
    return options;
  }

  // Change page size and wait until table updates
  // ...existing code...

 // Change page size robustly
async changePageSize(size: number) {
  // 1. Click the button to open the dropdown
  await this.pageSizeButton.click();

  // 2. Locate the live menu item in the portal
  const option = this.page.locator('ul[role="menu"] >> li', { hasText: `${size} rows` });

  // 3. Wait for it to be visible and enabled
  await expect(option.first()).toBeVisible({ timeout: 5000 });
  await expect(option.first()).toBeEnabled({ timeout: 5000 });

  // 4. Scroll into view if needed
  await option.first().scrollIntoViewIfNeeded();

  // 5. Click the option
  await option.first().click();

  // 6. Wait for the button text to update ("5 items" etc.)
  await expect(this.pageSizeButton).toHaveText(`${size} items`, { timeout: 5000 });

  // 7. Wait for the table to reflect the new rows
  await expect(this.table.locator("tbody tr")).toHaveCount(size, { timeout: 10000 });
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
      expect(headerText.trim()).toContain(expectedHeaders[i]); // using contain because some headers have sort icons
    }
  }

 //to verify all table headers are visible
  async verifyTableHeaders() {
    await expect(this.headerFirstName).toBeVisible();
    await expect(this.headerLastName).toBeVisible();
    await expect(this.headerEmail).toBeVisible();
    await expect(this.headerStatus).toBeVisible();
  }

 //verify admin page url
 async verifyAdminPageURL() {
    await expect(this.page).toHaveURL('https://stage-cms.bahah.com.au/admin/list');
  } 
  //verify title 
  async verifyTitle() {
    await expect(this.title).toBeVisible();
  }
  //verify add new user button
  async verifyAddButton() {
    await expect(this.addButton).toBeVisible();
  }
  //verify search bar
  async verifySearchBar() {
    await expect(this.searchBar).toBeVisible();
  }
  //navigate to admin section
  async gotoAdminSection()
    {
        await this.AdminSection.click();
    }
  //menu items based on status
    async verifyMenuItemsBasedOnStatus() {
    const status = (await this.firstStatusCell.innerText()).trim().toLowerCase();

    // Open burger menu
    await this.burgerMenuButton.click();

    // First item must always be "Edit"
    await expect(this.menuItems.nth(0)).toHaveText("View");

    // Second item depends on status
    if (status === "active") {
      await expect(this.menuItems.nth(1)).toHaveText("Disable");
    } else if (status === "inactive") {
      await expect(this.menuItems.nth(1)).toHaveText("Enable");
    } else {
      throw new Error(`Unexpected status value: ${status}`);
    }
  }
}

