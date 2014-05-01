Feature: Ability to stage changes to business entities before they are pushed to publishers

  Background:
    Given a typical campaign exists


  @JIRA-CPI-167
  Scenario: A visual indicator shows changes pending

    Given changes are staged for publishing
    When a user is navigating the CPI tool
    Then the user is presented with a visual indicator that changes are staged
    When the user has navigated to a dashboard with entities that have staged changes
    Then the user sees a visual element that highlights the fields that are staged in the entity's data table

  @JIRA-CPI-203
  Scenario: A quick view shows a list of changes pending

    Given creative changes are staged for publishing
    When a user is navigating the CPI tool
    And the user views the Quick View of staged changes
    Then the user sees a visual element that shows the quantity of changes for each category
    And the user is presented with the option to view the full list of changes
    When the user selects the option to see the full list of changes
    Then the user is presented with the full detailed view of staged changes


  @JIRA-CPI-134 @JIRA-CPI-135 @JIRA-CPI-167
  Scenario: Publish a list of staged changes

    Given changes are staged for publishing
    And the user is presented with an indication that changes are staged
    When a user selects an option for viewing the staged changes
    And the user approves the changes for multiple entities
    Then the changes are published

  @JIRA-CPI-136 @JIRA-CPI-135
  Scenario: Cancel a staged change

    Given changes are staged for publishing
    And the user is presented with an indication that changes are staged
    When a user selects some option for viewing the staged changes
    And the user cancels the changes for multiple entities
    Then the changes are canceled and no longer appear on the list of changes


