Feature: Login functionality

@valid_login
  Scenario: Valid login
    Given User is on the login page
    When User enters valid credentials
    Then User should see the dashboard

@invalid_email
 Scenario: Invalid Login 
   Given User is on the login page
    When I enter my invalid email
    And I enter my password
   And I click the login button
     Then I should see the error message

@empty_email
  Scenario: empty email field
     Given User is on the login page
     When I leave email field empty
    And I enter my password
    And I click the login button
   Then I should see the error message for email

@empty_password
   Scenario: empty password field
     Given User is on the login page
     When I enter my email 
     And I leave password field empty
     And I click the login button
    Then I should see the error message for password

@both_empty  
   Scenario: Both email and password empty
     Given User is on the login page
     When I leave email field empty
     And I leave password field empty
     And I click the login button
     Then I should see error messages for email and password

@wrong_password
  Scenario:Wrong password
    Given User is on the login page
    When I enter my email
    And I enter wrong password
    And I click the login button
    Then I should see the error message for wrong password