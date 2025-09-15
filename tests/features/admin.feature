
Feature:Admin

  Background: 
    Given I am already logged in and on the dashboard page of bahah
@addAdmin
 Scenario: Add new admin
  When I click on the "Admin users" section
  And I click on the "Add New user" button
  And I enter the first name 
  And I enter the last name 
  And I enter the email address 
  And I enter the contact number 
  And I click "create new admin" button
  Then I should see the toast message and new user added to the admit list
  And I should see the status as "Active"
  When I click on the profile icon
  And User click logout button 
  Then I should be navigated to login page                                                                                    

@page 
Scenario: Admin page
When I click on the Admin users menu item
Then I should be navigated to the admin page
And I should see the title as "Admin Users"
And I should see the "Add New user" button
And I should see the search bar
And I should see the table with headers
  | First Name | Last Name | Email | Status |

And The default page size should be 10 
Then I should see 10 rows in the table
When I change page size to 5
Then I should see 5 rows in the table
When I change page size to 15
Then I should see 15 rows in the table  