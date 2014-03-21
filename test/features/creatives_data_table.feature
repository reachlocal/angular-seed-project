Feature: Use a table containing a list of creatives and their metrics as a way to surface creative management functionality

  @JIRA-CPI-108 @JIRA-CPI-109 @JIRA-CPI-151
  Scenario: View creatives and their metrics for a specific AdGroup

    Given a typical campaign exists
    When the AdGroup is selected in the Global Nav Bar
    Then the list of creatives belonging to the selected AdGroup is listed in the data table
    And the data table should contain these data elements as columns:
      | Column Name                   | Data Type       | Description                                               |
      | Ad Text                       | String          | The headline and 2 descriptive lines of the Creative text |
      | Status                        | String          | Status of the creative, whether running or paused         |
      | Ad Group                      | String          | The AdGroup the creative belongs to                       |
      | Publisher                     | String          | The publisher the creative has been published to          |
      | Avg Position                  | Float 4,2       | From RL_OP/Publisher                                      |
      | Click Through Rate            | Percentage 4,2  | From RL_OP/Publisher                                      |
      | Clicks                        | Number          | From RL_OP/Publisher                                      |
      | Conversions                   | Percentage 4,2  | From Data Core                                            |
      | Impressions                   | Number          | From RL_OP/Publisher                                      |
      | Impression Share              | Percentage 4,2  | From RL_OP/Publisher                                      |
      | Lead Count                    | Number          | From Data Core                                            |
      | Quality Score                 | Number          | From RL_OP/Publisher                                      |


