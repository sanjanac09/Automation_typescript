import { expect } from "@playwright/test";
import { Page } from "playwright";
export class hairstylistpage
{
    readonly page: Page;
    readonly emailInput: ReturnType<Page['locator']>;
    readonly password: ReturnType<Page['locator']>;
    readonly loginButton: ReturnType<Page['locator']>;
    readonly dashboardHeading: ReturnType<Page['getByRole']>;
    readonly hairstylist: ReturnType<Page['locator']>;
    readonly moreOptionsButton: ReturnType<Page['locator']>;
    readonly editOption: ReturnType<Page['getByRole']>;
    readonly firstnamefield: ReturnType<Page['locator']>;
    readonly lastnamefield: ReturnType<Page['locator']>;
    readonly aboutyou: ReturnType<Page['getByRole']>;
    readonly saveChangesButton: ReturnType<Page['getByRole']>;
    readonly firstNameError: ReturnType<Page['locator']>;
    readonly lastNameError: ReturnType<Page['locator']>;
    readonly aboutYouError: ReturnType<Page['locator']>;
    readonly delete: ReturnType<Page['locator']>;
    readonly ToastMessageForDelete: ReturnType<Page['locator']>;
    readonly dateOfBirth: ReturnType<Page['locator']>;
    readonly genderDropdown: ReturnType<Page['locator']>;
    readonly serviceDirectionDropdown: ReturnType<Page['locator']>;
    readonly statusDropdown: ReturnType<Page['locator']>;
    readonly maleOption: ReturnType<Page['getByRole']>;
    readonly femaleOption: ReturnType<Page['getByRole']>;
    readonly othersOption: ReturnType<Page['getByRole']>;
    readonly confirmPopup: ReturnType<Page['locator']>;
    readonly yesButton: ReturnType<Page['locator']>;
    readonly ToastMessage: ReturnType<Page['locator']>;
    readonly statusActive: ReturnType<Page['locator']>;
    readonly statusInactive: ReturnType<Page['locator']>;
    readonly statusVerified: ReturnType<Page['locator']>;
    readonly statusEmailVerified: ReturnType<Page['locator']>;
    readonly comeToMeOption: ReturnType<Page['locator']>;
    readonly goToThemOption: ReturnType<Page['locator']>;
    readonly bothOption: ReturnType<Page['locator']>;
    readonly addNewUser: ReturnType<Page['getByRole']>;
    readonly firstname: ReturnType<Page['locator']>;
    readonly lastname: ReturnType<Page['locator']>;
    readonly emailAddress: ReturnType<Page['locator']>; 
    readonly contact: ReturnType<Page['locator']>;
    readonly createUser: ReturnType<Page['getByRole']>;
    readonly successmessage: ReturnType<Page['locator']>;
    readonly emailAddressError: ReturnType<Page['locator']>;
    readonly contactError: ReturnType<Page['locator']>;
    readonly profile: ReturnType<Page['locator']>;
    readonly logoutButton: ReturnType<Page['locator']>;                    

async delay(timeInMs: number) {
    return new Promise(resolve => setTimeout(resolve, timeInMs));
}

constructor (page:Page)
{
  this.page = page;
   //here are the locators for login page 
     this.emailInput = page.locator('input[placeholder="Enter your email"]');
     this.password = page.locator('input[placeholder="Password"]');
     this.loginButton = page.locator('button[type="submit"]');
     this.dashboardHeading =page.getByRole('heading', { name: 'Dashboard' });

   //here are the locators to add new user
     this.hairstylist = page.locator('a[href="/hairdressers-beauticians/list"]');
     this.moreOptionsButton = page.locator('//tbody/tr[1]/td[6]//button');
     this.editOption = page.getByRole('menuitem', { name: 'Edit' });
     this.firstnamefield = page.locator('input[placeholder="Enter first name"]');
     this.lastnamefield = page.locator('input[placeholder="Enter last name"]');
     this.aboutyou =page.getByRole('textbox', { name: 'Enter about you' });
     this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
     this.firstNameError = page.locator('text=First name is a required field');
     this.lastNameError = page.locator('text=Last name is a required field');
     this.aboutYouError = page.locator('text=About you is a required field');
   
     //locators for delete wall picture 
     this.delete = page.locator ('input[data-testid="DeleteOutlineIcon"]');
     this.ToastMessageForDelete = page.locator('text=Cannot delete a wall picture which is checked for wall picture.'); 

     //here are the locators to edit and add new user
     this.dateOfBirth = page.locator('input[placeholder="MM/DD/YYYY"]');
     this.genderDropdown = page.locator('#user-gender');
     this.serviceDirectionDropdown = page.locator('#user-service-provide-direction');
     this.statusDropdown = page.locator('#hairstylist-status');
     this.maleOption = page.getByRole('option', { name: 'Male' });
     this.femaleOption = page.getByRole('option', { name: 'Female' });
     this.othersOption = page.getByRole('option', { name: 'Others' });
     this.confirmPopup = page.locator('#confirm-modal-description').locator('..');
     this.yesButton = this.confirmPopup.locator('button', { hasText: 'Yes' });
     this.ToastMessage = page.locator('text=User updated successfully');
     
     //status
     this.statusActive = page.locator('li[data-value="active"]');
     this.statusInactive = page.locator('li[data-value="inactive"]');
     this.statusVerified = page.locator('li[data-value="verified"]');
     this.statusEmailVerified = page.locator('li[data-value="email_verified"]');
    
     //service direction
     this.comeToMeOption = page.locator('li[data-value="ComeToMe"]');
     this.goToThemOption = page.locator('li[data-value="GoToThem"]');
     this.bothOption = page.locator('li[data-value="Both"]');
    
     //here are the locators to add hairstylis
     this.addNewUser = page.getByRole('link', { name: 'Add new' });
     this.firstname = page.locator('input[placeholder="Enter first name"]');
     this.lastname = page.locator('input[placeholder="Enter last name"]');
     this.emailAddress = page.locator('input[placeholder="Your Email address"]');
     this.contact = page.locator('input[placeholder="Number"]');
     this.createUser = page.getByRole('button', { name: 'Create new user' });
     this.successmessage = page.locator('text=Admin created successfully')
     this.emailAddressError = page.locator('text=Email is a required field');
     this.contactError = page.locator('text=Phone number is required');
  
    //for logout page
     this.profile= page.locator('[data-testid="PersonIcon"]');
     this.logoutButton = page.locator('//p[normalize-space()=\'Logout\']');
  }
    //navigates to the following url
    async gotoLoginPage()
    {
      await this.page.goto('https://stage-cms.bahah.com.au/login', { timeout: 100000 })
    }
      //enter email in the email input field
    async enterInput(email:string,password:string)
    {
      await this.emailInput.fill(email);//adds email in the email field
      await this.password.fill(password); //adds password in the password field
      await this.loginButton.click();    //click on Sign in Now button 
    }
    //navigates to the dashboard page 
    async dashboard()
    {
      await this.page.waitForURL('https://stage-cms.bahah.com.au/dashboard',{timeout:5000});
      await expect(this.dashboardHeading).toBeVisible();
    }
    //naviagtes to the admin users section while clicking 
    async gotoHairstylistSection()
    {
        await this.hairstylist.click();
    }
    //click on the menuoptions
    async menuIcon()
    {
         await this.moreOptionsButton.click();
    }
    //click on the menuoptions
    async editbutton()
    {
         await this.editOption.click();
         await this.delay(30);
    }
    //clears the fields
    async clearfields()
    {
    // Clear First Name
    await this.firstnamefield.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstnamefield.scrollIntoViewIfNeeded();
    await this.firstnamefield.fill('');

    // Clear Last Name
     await this.lastnamefield.waitFor({ state: 'visible', timeout: 10000 });
       await this.lastnamefield.click(); // focus on Last Name
     await this.lastnamefield.fill(''); 
    // Clear About You
    // About You
     await this.aboutyou.scrollIntoViewIfNeeded();
     await this.aboutyou.waitFor({ state: 'visible', timeout: 15000 });
     await this.aboutyou.click();
     await this.aboutyou.fill('');
    }
     //clicks on the submit form button
     async SaveButton()
     {
        await this.saveChangesButton.click();
     }
     //displays error messages
    async errorMessages()
    {
      await expect(this.firstNameError).toBeVisible(); //error message for the firstname
      await expect(this.lastNameError).toBeVisible(); //error message for the lastname
      await expect(this.aboutYouError).toBeVisible(); //error message for the about you 
    }
    //delets the wall picture 
    async clickDelete()
    {
      await this.delete.click();
    }
     async deleteErrorMessage()
     {
      await this.ToastMessageForDelete.waitFor({state:'visible' ,timeout:5000})
     }
     //clears and enters firstname and lastname
    async enterInfo(firstname:string, lastname:string)
    {
      await this.firstnamefield.fill('')
      await this.firstnamefield.fill(firstname);
      await this.delay(30);
      await this.lastnamefield.fill('')
      await this.lastnamefield.fill(lastname);
      await this.delay(30);
    }
    async selectGender(gender:string) {
    // Open the dropdown
    await this.genderDropdown.click();
     
    // Convert the input to lowercase to avoid case issues
    const genderLower = gender.toLowerCase();

    // Select the option based on input
    if (genderLower === 'male') {
        await this.maleOption.click();
    } else if (genderLower === 'female') {
        await this.femaleOption.click();
    } else if (genderLower === 'others') {
        await this.othersOption.click();
    } else {
        throw new Error(`Gender option "${gender}" not available`);
    }
    await this.delay(30);
    }
    //add dateOfBirth
    async enterDateOfBirth(date:string)
    {
      await this.dateOfBirth.fill(date);
      await this.delay(30); // added delay time for 30 sec
    }
    //add bio in about you section
    async addAboutYou(info:string
    )
    {
      await this.aboutyou.scrollIntoViewIfNeeded();
      await this.aboutyou.fill(''); // clear first
      await this.aboutyou.click(); 
      await this.page.keyboard.type(info, { delay: 20 }); // types each character slowly
      await this.page.waitForTimeout(200); // wait
    }
    //update profile confirmation popup
    async popUp()
    {
      await this.confirmPopup.waitFor({ state: 'visible' , timeout:10000});
    }
    //click on yes button
     async confirmButton()
     {
        await this.yesButton.click();
     }
     //displays the sucess message 
    async sucessMessage()
    {
      await this.ToastMessage.waitFor({state: 'visible', timeout:5000});
    }
    //clicks the add new user button
    async clickAddNewButton()
    {
      await this.addNewUser.click();
    }
    //enters firstname and lastname 
    async EnterNames(firstname:string , lastname:string)
    {
      await this.firstname.fill(firstname);
      await this.lastname.fill(lastname);
    }
    //enters email in the emailfield
    async EnterEmail(email:string)
    {
      await this.emailAddress.fill(email);
    }
    //enters contact number 
    async EnterContact(contact:string)
    {
      await this.contact.fill(contact);
    }
    //clicks the create new user button
    async CreateUserButton()
    {
      await this.createUser.click();
    }
    //displays success message for new user added
    async sucessMessageUser()
    {
      await this.successmessage.waitFor({state: 'visible' , timeout:5000});
    }
    //displays error messages
    async errorMessageNewUser()
    {
       await expect(this.firstNameError).toBeVisible(); //error message for the firstname
       await expect(this.lastNameError).toBeVisible(); //error message for the lastname
       await expect(this.emailAddressError).toBeVisible();//error message for the emailaddress
       await expect(this.contactError).toBeVisible(); //error message for the contact number
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
     //verify status
   async clickStatus(option: 'active' | 'inactive' | 'verified' | 'email_verified') {
   const locator = this.page.locator(`li[data-value="${option}"]`);  

  await this.statusDropdown.click();           // open dropdown
  await locator.waitFor({ state: 'visible' }); // wait until the option is visible
  await this.page.waitForTimeout(500);
  await locator.click();                       // click on the option
}
}
export default hairstylistpage;
