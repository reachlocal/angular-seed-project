

Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter
  Scenario: View campaign-level dashboard

    Given a typical campaign exists
    When a user filters using All AdGroups
    Then the dashboard should be filtered to include all data for the campaign


  @JIRA-CPI-25 @dashboard @header
  Scenario:  View campaign basic data in the dashboard header

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    Then the user should see a campaign header:
      | Campaign Name                              | Advertiser Name        |
      | A Quality 1st Plumbing- Plumbing  20100222 | A Quality 1st Plumbing |
      # | MCID | |
      # | CCID | |
      # | Total Cycle Budget | |
      # | Spend to Date this cycle | |
      # | Total Contract Length | |
      # | Number of Days in Cycle  |
