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
      | Creative Text       |
      | New                 |
      | State               |
      | Ad Group            |
      | Publisher           |
      | Avg. Pos.           |
      | CTR                 |
      | Clicks              |
      | Conversions         |
      | CPL                 |
      | Impr.               |
      | Leads               |
      | QS                  |
      | Total Cost          |
    And the first creative is displayed
      | AdGroup2 Creative1  |
      | The Way Network     |
      | Duarte, CA          |
    And the report data for the first creative is displayed
      |   1.46 |
      | 38.13% |
      |     45 |
      | 26.66% |
      | $32.45 |
      |    118 |
      |     12 |
      |   6.56 |
      | $35.12 |

  @JIRA-CPI-132 @JIRA-CPI-133 @JIRA-CPI-188
  Scenario: Edit a creative in the data table

    When a user views the campaign id "713896" dashboard
    And a user updates the first creative's headline to "FooBar Plumbing"
    Then the system displays the characters remaining using that publisher's requirements
    And the creative's new headline should be "FooBar Plumbing"
    When the user selects the option to save
    Then the creative's edits are staged for publishing
    And the creative is validated against the publisher's requirements

  @JIRA-CPI-132 @JIRA-CPI-133
  Scenario: Cancel an edit on a creative in the data table

    When a user views the campaign id "713896" dashboard
    And he makes a change to the first creative's headline
    But he clicks to cancel those changes
    Then the creative reverts to its original state

  @JIRA-CPI-138
  Scenario: Change the creative's state in the data table from Active to Inactive and back

    Given a creative with the visible state of "Active" is in the data table
    When the user changes the state of the creative to "Inactive" in the data table
    Then the creative's state is "Inactive"
    When the user changes the state of the creative to "Active" in the data table
    Then the creative's state is "Active"

  @JIRA-CPI-33 @JIRA-CPI-34 @JIRA-CPI-35
  Scenario: Sort data by column within creative table

    When a user clicks a column header of types (alphanumeric, decimal)
    Then the system sorts the data within the clicked column in alphanumeric order, ascending
    When a user clicks the the same column header
    Then the system sorts the data within the clicked column in alphanumeric order, descending
    When a user clicks a column header of types (date)

  @JIRA-CPI-198
  Scenario: Viewing Creatives in the Data Table with Dynamic Text

    Given a creative with dynamic text attributes
    When the creative is viewed in the creative data table
    Then the dynamic text placeholder is marked with open and close braces
    And the area with the braces is shaded with a different color scheme

