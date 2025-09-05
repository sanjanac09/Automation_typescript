Feature:test

Background:
Given I am already logged in and on the dashboard page of bahah

Scenario: Admin page
When I click on the "Admin users" section
Then I should be navigated to the admin page
And I should see the title as "Admin Users"
And I should see the "Add New user" button
And I should see the search bar
And I should see the table with headers
  | First Name | Last Name | Email | Status |
And The default page size should be 10 
Then I should see 10 rows in the table


Scenario: Change page size
    When I change page size to 5
    Then I should see 5 rows in the table

    When I change page size to 15
    Then I should see 15 rows in the table