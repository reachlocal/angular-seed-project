Feature: Use a table containing a list of creatives and their metrics as a way to surface creative management functionality

  @JIRA-CPI-108 @JIRA-CPI-109 @JIRA-CPI-151
  Scenario: View creatives and their metrics for a specific AdGroup

    Given a typical campaign exists
    When a user views the campaign id "1422307" dashboard
    When the AdGroup is selected in the Global Nav Bar
    Then the list of creatives belonging to the selected AdGroup is listed in the data table
    And the data table should contain these data elements as columns:
      | Column Name         |
      | Ad Text             |
      | Status              |
      | Ad Group            |
      | Publisher           |
      | Average Position    |
      | Click Through Rate  |
      | Clicks              |
      | Conversions         |
      | Impressions         |
      | Impression Share    |
      | Lead Count          |
      | Quality Score       |
    And the first creative has "Driveway Coating and More" as headline
    And the first creative has "Driveway and Sidewalk Sealcoating, Repairs and Maintenance. Call Now." as descriptive lines
    And the first creative has th


