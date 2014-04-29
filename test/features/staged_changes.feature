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

    Given changes are staged for publishing
    When a user is navigating the CPI tool
    When the user mouse over the visual indicator that changes are staged
    Then the user sees a visual element that shows a list of changes pending to publish
    And the user can navigated to a dashboard with entities that have staged changes.


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


  @JIRA-CPI-169
  Scenario: View the difference between the original entity and the changed element

    Given changes are staged for publishing
    When the user is presented with the list of changes
    Then the user should see the original entity before the change
    And the user should see the changed entity
    And the changed entity should be highlighted


  @JIRA-CPI-170
  Scenario: Fields should be locked for editing when publish is pending

    Given changes have been published
    When the user is viewing a changed entity's data table
    Then the user should be prevented from making changes to data elements published but not yet confirmed by the bots
    And the user should see a visual element that shows the data element as being locked
