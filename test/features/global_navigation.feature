Feature: Each dashboard should have a consistent global navigation function

  @JIRA-CPI-23 @dashboard @filter
  Scenario: View Global Nav Bar with Publisher AdGroups

    Given a typical campaign exists
    And the campaign has the following AdGroups:
      | AdGroup       | Publisher     |
      | First AdGroup | Google        |
    When a user views the Global Nav Filter
    Then he should see 'First AdGroup' under the 'All AdGroups' section
    And he should see a section only for the publisher 'Google'
    And the 'First AdGroup' should be listed under 'Google' section

  @JIRA-CPI-151 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under All Ad Groups

    Given a typical campaign exists
    And the campaign has the following AdGroups:
      | AdGroup       | Publisher     |
      | First AdGroup | Google        |
    When the user selects 'First AdGroup' under the all AdGroups section
    Then the campaign dashboard should show the data table of Creatives under 'First AdGroup' across all publishers

  @JIRA-CPI-151 @dashboard @filter
  Scenario: Select an AdGroup in Global Nav Bar under a specific publisher

    Given a typical campaign exists
    And the campaign has the following AdGroups:
      | AdGroup       | Publisher     |
      | First AdGroup | Google        |
    When the user selects 'First AdGroup' under its publisher 'Google'
    Then the campaign dashboard should show the data table of Creatives under 'First AdGroup' only for the publisher 'Google'




  @JIRA-CPI-25 @dashboard @header
  Scenario:  View campaign basic data in the dashboard header

    Given campaign with id "713896" exists
    When a user views the campaign id "713896" dashboard
    Then the user should see a campaign header:
      | name                                      | masterCampaignId   | currentCampaignId   | totalCycleBudget | spentToDateThisCycle | currentCycle |
      | A Quality 1st Plumbing- Plumbing 20100222 | 713896             | 713896              | $1,800.00        | $0.00                | 1            |
