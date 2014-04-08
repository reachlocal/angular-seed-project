Feature: Use a table containing a list of creatives and their metrics as a way to surface creative management functionality

  Background:
    Given a typical campaign exists

  @JIRA-CPI-108 @JIRA-CPI-109 @JIRA-CPI-151
  Scenario: View creatives and their metrics for a specific AdGroup

    When a user views the campaign id "713896" dashboard
    And the user selects the web publisher campaign "Local Profile (City)"
    And the user selects the ad group "Primary Ad Group"
    Then the list of creatives belonging to the selected AdGroup is listed in the data table
    And the data table should contain these data elements as columns:
      | Column Name         |
      | Ad Text             |
      | Status              |
      | Ad Group            |
      | Publisher           |
      | Avg Position        |
      | CTR                 |
      | Clicks              |
      | Conversions         |
      | Impressions         |
      | Impression Share    |
      | Leads               |
      | QS                  |
    And the first creative is displayed
      | AdGroup2 Creative1  |
      | The Way Network     |
      | Duarte, CA          |
    And the report data for the first creative is displayed
      |   1.46 |
      | 38.13% |
      |     45 |
      | 26.66% |
      |    118 |
      | 14.20% |
      |     12 |
      |      6 |



  @JIRA-CPI-132 @JIRA-CPI-133
  Scenario: Edit a creative in the data table

    When a user selects a creative for editing in the data table
    And the user makes a change to the creative's headline or descriptive lines
    And the user selects the option to save
    Then the creative's edits are staged for publishing

  @JIRA-CPI-132 @JIRA-CPI-133
  Scenario: Cancel an edit on a creative in the data table

    When a user selects a creative for editing in the data table
    And the user makes a change to the creative's headline or descriptive lines
    And the user selects the option to cancel
    Then the creative's edits are not saved
    And the creative reverts to its original state


  @JIRA-CPI-138
  Scenario: Edit a creative's status in the data table

    When the user changes the status of the creative
    Then the creative's status change is staged for publishing




