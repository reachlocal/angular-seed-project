@JIRA-CPI-2
Feature: Surface recommendations

  These scenarios try to explain the overall concept of a "Guided" and "Automated" Recommendation.

  Guided recommendation: A recommendation that gives direction to the user to make an adjustment to a campaign.  It provides
  an option to navigate to the functional area of CPI related to the recommendation itself.

  Automated recommendations:  A recommendation that provides to the user a recommendation to make an adjustment to a campaign,
  and provides the option to make the adjustment within the recommendation itself.



  For guided recommendations:
  If the user chooses the option to navigate, then the user is taken to the functional area of CPI related to the recommended
  adjustment.  For example, if the recommendation is to add sitelinks to a campaign, then selecting the Navigate option
  will take the user to the Add Sitelinks view in CPI, and the navigate option changes to a positive "Yes, I implemented this"
  option.
  After the user implements the recommendation, they are expected to select the positive option.


  For automated recommendations:
  The user is presented with the recommendation text itself, as well as a line item for each adjustment that can be made automatically.
  The individual line items can be positively or negatively selected (i.e. "Implement this line item" or "Dismiss this line item as
  not implemented").  The user can select to implement ALL line items or dismiss ALL line items.

  For all recommendation types:
  The user can select an option to dismiss the recommendation with a negative "No, I did not implement this" option.




  @JIRA-CPI-26
  Scenario:  Surface recommendations on the CPI dashboard

    Given a typical campaign exists
    And the campaign contains non-dismissed recommendations
    When the campaign dashboard is viewed
    Then the list of recommendations is displayed
    And the recommendations are sorted by date descending
    And the recommendations contain a single line of descriptive text
    When a recommendation is selected
    Then the recommendation section is expanded to include the full details of the recommendation


  @JIRA-CPI-26
  Scenario: Surface Guided recommendations with the right dismissal options


    Given a "Guided" recommendation for a campaign is available
    When the recommendation is surfaced to the user
    Then the user is presented with an option to navigate where the recommendation can be implemented
    And the user is presented with an option to dismiss the recommendation as not implemented



  @JIRA-CPI-26
  Scenario: Navigate a guided recommendation

    Given a "Guided" recommendation for a campaign is available
    And the user has expanded the recommendation
    When the user selects the option to navigate
    Then the user is navigated to the functional area for the recommendation
    And the option to navigate changes to an option to dismiss the recommendation as "Yes, I implemented this"

  @JIRA-CPI-26
  Scenario: Dismiss a Guided Recommendation with positive result

    Given a "Guided" recommendation
    When the user has navigated to the recommendation functional area
    And the user has implemented the Guided recommendation
    And the user has selected the recommendation option "Yes, I implemented this"
    Then the recommendation is dismissed from the campaign
    And the user action is recorded for analysis

  @JIRA-CPI-26
  Scenario: Dismiss a Guided Recommendation with negative result

    Given a "Guided" recommendation
    When the user has selected the recommendation option "No, I will not implemented this"
    Then the recommendation is dismissed from the campaign
    And the user action is recorded


















  @sitelinks @JIRA-CPI-66
  Scenario: Surface a recommendation to add site links when none exist

    Given a typical campaign exists
    When the recommendation engine encounters a campaign without site links implemented
    And a previous recommendation was not dismissed by a CP
    Then surface a recommendation to add site links to the campaign


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
