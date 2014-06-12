Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter @regression
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

  @JIRA-CPI-151 @dashboard @filter @regression
  Scenario: Select an AdGroup in Global Nav Bar under All Ad Groups

    Given a campaign with id "713896" exists
    And the campaign has the following AdGroups:
      | AdGroup          | Publisher |
      | Primary Ad Group | Google    |
    When the user selects the ad group "Primary Ad Group"
    Then the campaign dashboard should show the data table of Creatives under "First AdGroup" across all publishers

  @JIRA-CPI-151 @dashboard @filter @regression
  Scenario: Select an AdGroup in Global Nav Bar under a specific web publisher campaign

    Given a campaign with id "713896" exists
    And the campaign has the following AdGroups:
      | AdGroup             | Web Publisher Campaign |
      | Primary Ad Group    | Local Profile (City)   |
      | Commercial Plumbing | Local Profile (City)   |
    When a user views the campaign id "713896" dashboard
    And the user selects the web publisher campaign "Local Profile (City)"
    And the user selects the ad group "Primary Ad Group"
    Then the campaign dashboard should show the data table of Creatives under "Primary Ad Group" only for the WPC "Local Profile (City)"

  @JIRA-CPI-25 @dashboard @header @regression
  Scenario:  View campaign basic data in the dashboard header

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    Then the user should see a campaign header:
      | name                                      | masterCampaignId | currentCampaignId | totalCycleBudget | spentToDateThisCycle | currentCycle |
      | A Quality 1st Plumbing- Plumbing 20100222 | 713896           | 713896            | $1,800.00        | $0.00                | 1            |

  @JIRA-CPI-197
  Scenario: Select a creative status in Global Nav Bar under All Creatives

    Given a campaign with id "713896" exists
    And the campaign has Creatives associated to the campaign
    When a user views the campaign id "713896" dashboard
    And the user selects "Active" from the Creative status filter
    Then the campaign dashboard should only show the data table of Creatives that have the "Active" Creative status


  @JIRA-CPI-192 @JIRA-CPI-193 @JIRA-CPI-143
  Scenario: Viewing preset date ranges in Calendar filter

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    And the user selects the calendar widget with the intent to select a date range
    Then the calendar widget should display the following preselected items:
      | Preset Date Range Text |
      | Last 30 Days           |
      | Last 60 Days           |
      | Last 90 Days           |
      | All Time               |
      | Yesterday              |
      | Last 7 Days            |
      | This Month             |
      | Last Month             |
      | Custom                 |
