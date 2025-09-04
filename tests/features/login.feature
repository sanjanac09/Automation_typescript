Feature: Login functionality

  Scenario: Valid login
    Given User is on the login page
    When User enters valid credentials
    Then User should see the dashboard
