Feature: Recommendations to make adjustments to Ad Groups


  @adgroups @JIRA-CPI-67
  Scenario:  Surface a recommendation to add ad groups when there are fewer than 6

    Given a typical campaign exists
    When the recommendation engine encounters a campaign with less than 6 Ad Groups defined
    And a previous recommendation was not dismissed by a CP
    Then surface a recommendation to make sure 6 Ad Groups are defined for the campaign


  @ads @adgroups @performance @JIRA-CPI-68
  Scenario:  Surface a recommendation to request review of an ad when it outperforms compared to others within the same ad group


    Given a typical campaign exists
    And the campaign has 6 creatives defined
    When the recommendation engine encounters the ad group
    And 1 creative has a conversion rate XX% greater than the next highest conversion rate for an creative within the same ad group (GRACE:  how much higher?)
    Then surface a recommendation to review the ad group
    When a CP dismisses the recommendation
    Then a reason for dismissal is collected.