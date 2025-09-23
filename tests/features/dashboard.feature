Feature: Dashboard Page Verification

  Background:
    Given I am logged in and on the dashboard page of bahah

  @dashboard
  Scenario: Verify summary cards
    Then I should see all summary cards on dashboard

  Scenario: Verify services booked section
    Then I should see services booked section with sort option

  Scenario: Verify hairdressers section
    Then I should see hairdressers section with more link

  Scenario: Verify customers section
    Then I should see customers section with more link
