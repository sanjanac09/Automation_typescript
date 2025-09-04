
Feature:Admin

  Background: 
    Given I am already logged in and on the dashboard page of bahah

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
  When I click on the profile
  And I click logout button 
  Then I should navigate to login page 

