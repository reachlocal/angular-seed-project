@JIRA-CPI-2
Feature: Surface recommendations

  These scenarios try to explain the overall concept of a "Guided" and "Automated" Recommendation.

  Guided recommendation: A recommendation that gives direction to the user to make an adjustment to a campaign.  It provides
  an option to navigate to the functional area of CPI  or an external tool related to the
  recommendation itself.

  Automated recommendations:  A recommendation that provides to the user a recommendation to make an adjustment to a campaign,
  and provides the option to make the adjustment within the recommendation itself.



  For guided recommendations:
  If the user chooses the option to navigate, then the user is taken to the functional area of CPI or external tool related to the recommended
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



  @JIRA-CPI-26
  Scenario: Surface Automated recommendations with the right dismissal options


    Given an "Automated" recommendation for a campaign is available
    When the recommendation is surfaced to the user
    Then the user is presented with one or more line items of recommendations that can be individually implemented or dismissed
    And the user is presented with the option to implement all remaining recommendation line items
    And the user is presented with the option to dismiss all remaining recommendation line items


  @JIRA-CPI-26
  Scenario: Implement and/or dismiss a single automated recommendation line item

    Given an "Automated" recommendation for a campaign is available
    When the recommendation is surfaced to the user
    And the the user is presented with one or more line items of recommendations that can be individually implemented or dismissed
    And the user selects the "Implement this" option for a single line item
    Then the recommendation change is made to the campaign
    And the line item is removed from the recommendation line item list
    And the user action is recorded
    When the user selects the "Dismiss this" option for a single line item
    Then the recommendation is dismissed from the campaign
    And the line item is removed from the recommendation line item list
    And the user action is recorded


  @JIRA-CPI-26
  Scenario: Implement and/or dismiss multiple automated recommendation line items

    Given an "Automated" recommendation for a campaign is available
    When the recommendation is surfaced to the user
    And the the user is presented with one or more line items of recommendations that can be individually implemented or dismissed
    And the user selects the option to dismiss all recommendations as Not Implemented
    Then the entire list is dismissed
    And the recommendation is dismissed
    And the user action is recorded
    When the user selects the option to Implement all recommendations
    Then the entire list is implemented
    And the recommendation is dismissed
    And the user action is recorded






