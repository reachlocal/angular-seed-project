Feature: Recommendations to modify a campaign's site links




  @sitelinks @JIRA-CPI-66
  Scenario: Surface a recommendation to add site links when none exist

    Given a typical campaign exists
    When the recommendation engine encounters a campaign without site links implemented
    And a previous recommendation was not dismissed by a CP
    Then surface a recommendation to add site links to the campaign
