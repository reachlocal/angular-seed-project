Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter
  Scenario: View Global Nav Bar with Web Publisher Campaign AdGroups

    Given campaign with id "713896" exists
    And the campaign has the following AdGroups:
      | AdGroup             | Web Publisher Campaign |
      | Primary Ad Group    | Local Profile (City)   |
      | Commercial Plumbing | Local Profile (City)   |
    When a user views the campaign id "713896" dashboard
    And the user selects the web publisher campaign "Local Profile (City)"
    Then the "Primary Ad Group" should be listed under "Local Profile (City)" section
    And the "Commercial Plumbing" should be listed under "Local Profile (City)" section

  @JIRA-CPI-151 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under All Ad Groups

    Given a campaign with id "713896" exists
    And the campaign has the following AdGroups:
      | AdGroup       | Publisher     |
      | First AdGroup | Google        |
    When the user selects 'First AdGroup' under the all AdGroups section
    Then the campaign dashboard should show the data table of Creatives under 'First AdGroup' across all publishers

  @JIRA-CPI-151 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under a specific web publisher campaign

    Given a campaign with id "713896" exists
    And the campaign has the following AdGroups:
      | AdGroup             | Web Publisher Campaign    |
      | Primary Ad Group    | Local Profile (City)      |
      | Commercial Plumbing | Local Profile (City)      |
    When a user views the campaign id "713896" dashboard
    And the user selects the web publisher campaign "Local Profile (City)"
    And the user selects "Primary Ad Group" from the web publisher campaign "Local Profile (City)"
    Then the campaign dashboard should show the data table of Creatives under "Primary Ad Group" only for the WPC "Local Profile (City)"

  @JIRA-CPI-25 @dashboard @header
  Scenario:  View campaign basic data in the dashboard header

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    Then the user should see a campaign header:
      | name                                      | masterCampaignId   | currentCampaignId   | totalCycleBudget | spentToDateThisCycle | currentCycle |
      | A Quality 1st Plumbing- Plumbing 20100222 | 713896             | 713896              | $1,800.00        | $0.00                | 1            |
