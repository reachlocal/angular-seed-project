Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter
  Scenario: View campaign-level dashboard

    Given a typical campaign exists
    When a user filters using All AdGroups
    Then the dashboard should be filtered to include all data for the campaign


  @JIRA-CPI-25 @dashboard @header
  Scenario:  View campaign basic data in the dashboard header

    Given a typical campaign exists
    When a user views the campaign dashboard
    Then the user should see a campaign header
    And the header should contain the "Campaign Name"
    And the header should contain the "Advertiser Name"
    And the header should contain the "MCID"
    And the header should contain the "CCID"
    And the header should contain the "Total Cycle Budget"
    And the header should contain the "Spend to Date this cycle"
    And the header should contain the "Total Contract Length"
    And the header should contain the "Number of Days in Cycle"



