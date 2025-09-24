import { Given, When , Then } from "@cucumber/cucumber";
import {CustomWorld} from '../support/world.js'
import hairstylistpage from "../pages/hairstylistpage.js";
import { faker } from '@faker-js/faker';

let  hairstylist : hairstylistpage;
Given('I am logged in and on the dashboard page of bahah.',{ timeout: 100000 }, async function () {
  hairstylist = new hairstylistpage(this.page); //  get the page object correctly
  await hairstylist.gotoLoginPage();
  await hairstylist.enterInput('sanjana.chaudhary@ebpearls.com','Password@1');
  await hairstylist.dashboard();
});

When('I navigate to the  "Hairstylist" tab',async function(){
  await hairstylist.gotoHairstylistSection();
});

When ('I select "Edit" option',async function()
{
  await hairstylist.editbutton();
})

When('I open the menu and select "Edit"', async function() {
  await hairstylist.menuIcon();
  await hairstylist.editbutton();
})

When ('I open the menuItems and verify options "Edit" and "Enable/Disable" based on current status',async function()        
{
   await hairstylist.menuIcon();
   await hairstylist.verifyMenuItems('active'); // passing status'active' or 'inactive'
})

//check for validations while editing hairstylist
 When('I clear all required fields',{ timeout: 6000 },async function()
{
  await hairstylist.clearfields();
})

When('I click on the save changes button',async function()
{
  await hairstylist.SaveButton();
})

Then('I should see  a error messages',async function()
{
  await hairstylist.errorMessages();
})

//edit hairstylist
When('I upload the profile picture',{timeout:6000},async function()
{
  await hairstylist.uploadProfilePicture('uploads/image1.jpeg');
})
When('I update the "First Name" and "Last Name" field with a new value',{timeout:9000},async function()
{
   const firstName = faker.person.firstName();   // generates random first name
   const lastName = faker.person.lastName();     // generates random last name
  await hairstylist.enterInfo(firstName,lastName);
})
When('I select a different option from the "Gender" dropdown',async function()
{
  await hairstylist.selectGender('female');
})
When('I update the "Date of Birth" field',async function()
{
  await hairstylist.enterDateOfBirth('10/12/1996');
})
When('I select a "Service Provide Direction" from the dropdown',{ timeout: 20000 },async function()
{
  await hairstylist.selectServiceDirection('Both');
})
When('I select the street address from the location suggestions',{ timeout: 20000 },async function()
{
  await hairstylist.enterLocation('Melbourne, Victoria, Australia');
})
 When('I update the "About You" section with new text',{ timeout: 20000 },async function()
{
  await hairstylist.addAboutYou('Passionate hairstyliss."');
})
 When('I click on the "Save Changes" button',async function()
{
  await hairstylist.SaveButton();
})
Then ('I should see a confirmation popup',{ timeout: 15000 },async function()
{
 await hairstylist.popUp();
})
When ('I confirm by clicking "Yes"',async function()
{
 await hairstylist.confirmButton();
})
Then('I should see a success message "User updated successfully"',async function()
{
 await hairstylist.sucessMessage();
})

//Add new user
When ('User click on the "Add New user" button', async function()
{
  await hairstylist.clickAddNewButton();
})
When ('I enter First Name and "Last Name"',async function()
{
  await hairstylist.EnterNames('sanjnana' , 'chaudhary');
})
When ('I enter email address',async function()
{
  const randomEmail = `sanjana_${Math.floor(Math.random() * 100000)}@gmail.com`;
  await hairstylist.EnterEmail(randomEmail);
})
When ('I enter contact number',async function()
{
  const randomNumber = `+61 48${Math.floor(100000 + Math.random() * 899999)}`; // Generates a number like +61 48XXXXXX
  await hairstylist.EnterContact(randomNumber);
})
When ('I click on the "Create New User " button', async function()
{
  await hairstylist.CreateUserButton();
}) 
Then ('I should see a sucess message as "Admin created successfully".',async function()
{
  await hairstylist.sucessMessageUser();
  await hairstylist.verifyUserAdded();
})

//verify logout 
When ('I click on the profile',async function()
{
  await hairstylist.clickProfile();
});
When ('I click logout button',async function()
{
  await hairstylist.clickLogout();
});
Then('I should navigate to login page',async function()
{
  await hairstylist.VerifyLogout();
});

//errors for add new user validation
Then ('I should see error messages',async function ()
{
  await hairstylist.errorMessageNewUser();
})

//verify status
When ('I select a status from the "Status" dropdown',async function ()
{
  await hairstylist.clickStatus('active');
});

