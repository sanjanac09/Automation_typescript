import { expect, Page } from '@playwright/test';

export class AdminPage{
  static email(arg0: string) {
    throw new Error("Method not implemented.");
  }
   readonly page: Page; 

  readonly emailInput: ReturnType<Page['locator']>;
  readonly password: ReturnType<Page['locator']>;
  readonly loginButton: ReturnType<Page['locator']>;
  readonly dashboardHeading: ReturnType<Page['getByRole']>;
  readonly AdminSection: ReturnType<Page['locator']>;
  readonly AddNewUser: ReturnType<Page['locator']>;
  readonly FirstName: ReturnType<Page['locator']>;
  readonly LastName: ReturnType<Page['locator']>;
  readonly Email: ReturnType<Page['locator']>;
  readonly Contact: ReturnType<Page['locator']>;
  readonly submitFormBtn: ReturnType<Page['locator']>;
  readonly ToastMessage: ReturnType<Page['locator']>;
  readonly profile: ReturnType<Page['locator']>;
  readonly logoutButton: ReturnType<Page['locator']>;
  readonly adminTable: ReturnType<Page['getByRole']>;
    constructor(page:Page)
    {
      this.page = page;
        
     //loctors are defined here 
     //for login page and already on dashboard 
     this.emailInput = page.locator('input[placeholder="Enter your email"]');
     this.password = page.locator('input[placeholder="Password"]');
     this.loginButton = page.locator('button[type="submit"]');
     this.dashboardHeading =page.getByRole('heading', { name: 'Dashboard' });
     //for admin page to add new 
     this.AdminSection= page.locator('text=Admin Users');
     this.AddNewUser = page.locator('text=Add new');
     this.FirstName = page.locator('input[placeholder="Enter first name"]');
     this.LastName = page.locator('input[placeholder="Enter last name"]');
     this.Email = page.locator('input[placeholder="Your Email address"]');
     this.Contact = page.locator('input[placeholder="Number"]');
     this.submitFormBtn = page.locator('button[type="submit"]');
     this.ToastMessage = page.locator('text=Admin created successfully'); 
     //for logout page
     this.profile= page.locator('[data-testid="PersonIcon"]');
     this.logoutButton = page.locator('//p[normalize-space()=\'Logout\']');
     //locator for table 
     this.adminTable = page.getByRole('table');
    
    }
    //navigates to the following url
    async gotoLoginPage()
    {
      await this.page.goto('https://stage-cms.bahah.com.au/login', { timeout: 100000 })
    }
   
    async email(email: string)
    {
      await this.emailInput.fill(email);   //enter email in the email input field
    }
   
    async enterPassword(password: string)   //enter password in the password field
    {
      await this.password.fill(password)
    }
    //click on Sign in Now button 
    async SignInNow()
    {
      await this.loginButton.click();
    }
    //navigates to the dashboard page 
    async dashboard()
    {
      await this.page.waitForURL('https://stage-cms.bahah.com.au/dashboard',{timeout:5000});
      await expect(this.dashboardHeading).toBeVisible();
   }
    //naviagtes to the admin users section while clicking 
    async gotoAdminSection()
    {
        await this.AdminSection.click();
    }
    //clicks on Add new users button
    async clickAddNewUser()
    {
        await this.AddNewUser.click();
    }
    //fills the first name with provided first name
    async enterFirstName(name: string)
    {
        await this.FirstName.fill(name);
        }
    //fills the last name with provided last name
     async enterLastName(name : string)
     {
        await this.LastName.fill(name);
     }   
    //fill the email address
     async enterEmail(email: string)
     {
        await this.Email.fill(email);
     }
    //fill the contact number
     async enterContact(contact: string)
     {
        await this.Contact.fill(contact);
     }
    //clicks on the submit form button
     async submitForm()
     {
        await this.submitFormBtn.click();
     }
    // verify if the toast message is displayes or not 
     async verifyToastMessage()
     {
        await this.ToastMessage.waitFor({state: 'visible', timeout:10000});
     }
    //verify after successfully admin is added the page redirects to the folloeing url or not 
     async verifyUserAdded()
     {
        await this.page.waitForURL('https://stage-cms.bahah.com.au/admin/list',{timeout:5000});
     }
     //this fucntion clicks on profile 
     async clickProfile()
     {
      await this.profile.click();
     }
     //this function clicks the logout 
     async clickLogout()
     {
      await this.logoutButton.click();
     }
     //this fucntion verifies the 
     async VerifyLogout()
     {
     await this.page.waitForURL('https://stage-cms.bahah.com.au/login',{timeout:5000});
     }
     //this function verifies the user is added in the table or not
     async VerifyUserAdded(email: string)
     {
      await expect(this.adminTable).toContainText(email);
     }
     //this function verifies the status is active or not
    async VerifyStatus(email:string , expectedStatus = 'Active') {
    // Locate the row for the specific user
    const userRow = this.page.locator('tr', { hasText: email });

    // Locate the status cell inside this row (4th td -> span inside div)
    const statusCell = userRow.locator('td:nth-child(4) >> div >> span');

    // Wait and verify
    await expect(statusCell).toHaveText(expectedStatus, { timeout: 10000 });
}
   }


