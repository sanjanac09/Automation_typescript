Feature:Hairstylist

  Background: 
    Given I am logged in and on the dashboard page of bahah.
    @add
    Scenario: Add new Hairstylist
    When I navigate to the  "Hairstylist" tab
    And User click on the "Add New user" button
    And I enter First Name and "Last Name"
    And I enter email address 
    And I enter contact number 
    And I click on the "Create New User " button
    Then I should see a sucess message as "Admin created successfully".
    When I click on the profile
    And I click logout button 
    Then I should navigate to login page 
    
    @validation
    Scenario: Edit the profile of Hairstylist
    When I navigate to the  "Hairstylist" tab
    And I open the menu and select "Edit"
    And I clear all required fields
    And I click on the save changes button
    Then I should see  a error messages
    
    @Edit
    Scenario: Edit the profile and add valid data
    When I navigate to the  "Hairstylist" tab
    And I open the menu and select "Edit"
    And I upload the profile picture 
    And I update the "First Name" and "Last Name" field with a new value
    And I select a different option from the "Gender" dropdown
    And I update the "Date of Birth" field
    And I select a "Service Provide Direction" from the dropdown
    And I select the street address from the location suggestions
    And I select a status from the "Status" dropdown
    And I update the "About You" section with new text
    And I click on the "Save Changes" button
    Then I should see a confirmation popup 
    When I confirm by clicking "Yes"
    Then I should see a success message "User updated successfully"

   @submit
   Scenario: submit with all fields empty
   When I navigate to the  "Hairstylist" tab
   And User click on the "Add New user" button
   And I click on the "Create New User " button
   Then I should see error messages 