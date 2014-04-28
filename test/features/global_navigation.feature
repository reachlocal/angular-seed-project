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

  @JIRA-CPI-197
  Scenario: Select a creative status in Global Nav Bar under All Creatives
  
    Given a campaign with id "713896" exists
    And the campaign has Creatives associated to the campaign
    When a user views the campaign id "713896" dashboard
    And the user selects "Active" from the Creative status filter
    Then the campaign dashboard should only show the data table of Creatives that have the "Active" Creative status


  @JRIA-CPI-192 @JRIA-CPI-193
  Scenario: Viewing preset date ranges in Calendar filter

    Given a calendar filter mechanism present
    When the user selects the calendar widget with the intent to select a date range
    Then the calendar widget should display a full calendar
    And the calendar widget should display the following preselected items:
      | Preset Date Range Text | Start Date                    | End Date     |
      | Last 30 Days           | 30 days before current date   | Current date |
      | Last 60 Days           | 60 days before current date   | Current date |
      | Last 90 Days           | 90 days before current date   | Current date |
      | All-Time               | Start date of master campaign | Current date |
      | Yesterday              | 1 day before current date     | Current date |
      | Last 7 Days            | 7 days before current date    | Current date |
      | Last Calendar Month    | 1st of the month preceeding   | Current date |


  @JRIA-CPI-192 @JRIA-CPI-193
  Scenario Outline: Selecting a preset date range in Calendar filter

    Given the current date is "<current_date>"
    And the master campaign start date is "<master_campaign_start_date>"
    When the user selects the preset date range item "<preset_date_item>"
    Then the date range should start at "<start_date>" inclusive
    And the date range should end at "<end_date>" inclusive

  Examples:
    | preset_date_item    | master_campaign_start_date | current_date | start_date | end_date  |
    | Last 30 Days        | N/A                        | 4/15/2014    | 3/16/2014  | 4/15/2014 |
    | Last 60 Days        | N/A                        | 4/15/2014    | 2/14/2014  | 4/15/2014 |
    | Last 90 Days        | N/A                        | 4/15/2014    | 1/15/2014  | 4/15/2014 |
    | All-Time            | 12/15/2013                 | 4/15/2014    | 12/15/2013 | 4/15/2014 |
    | Yesterday           | N/A                        | 4/15/2014    | 4/14/2014  | 4/15/2014 |
    | Last 7 Days         | N/A                        | 4/15/2014    | 4/8/2014   | 4/15/2014 |
    | Last Calendar Month | N/A                        | 4/15/2014    | 3/1/2014   | 3/31/2014 |




