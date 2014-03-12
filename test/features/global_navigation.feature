

Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter
  Scenario: View Global Nav Bar with Publisher AdGroups

    Given a typical campaign exists
    And the campaign has AdGroups assigned to at least 1 publisher
    When a user views the Global Nav Filter
    Then the AdGroups should be displayed under the All Ad Groups section
    And the Publisher should be displayed as its own section in the Nav Filter
    And the AdGroup should also be displayed under the Publisher section

  @JIRA-CPI-23 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under All Ad Groups

    Given a typical campaign exists
    And the campaign has AdGroups assigned to at least 1 publisher
    When the user selects an AdGroup under the All Ad Groups section
    Then the campaign dashboard should show the data table of Creatives under that AdGroup across all publishers

  @JIRA-CPI-23 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under a specific publisher

    Given a typical campaign exists
    And the campaign has AdGroups assigned to at least 1 publisher
    When the user selects an AdGroup under a publisher section
    Then the campaign dashboard should show the data table of Creatives under that AdGroup under that specific publisher






  @JIRA-CPI-25 @dashboard @header
  Scenario:  View campaign basic data in the dashboard header

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    Then the user should see a campaign header:
      | name                                      | masterCampaignId   | currentCampaignId   | totalCycleBudget | spentToDateThisCycle | currentCycle |
      | A Quality 1st Plumbing- Plumbing 20100222 | 713896             | 713896              | $1,800.00        | $0.00                | 1            |
