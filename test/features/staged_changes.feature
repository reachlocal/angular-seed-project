Feature: Ability to stage changes to business entities before they are pushed to publishers

  Background:
    Given a typical campaign with 5 creative staged changes exists

  @JIRA-CPI-167
  Scenario: Staged changes are already present

    When a user is navigating the typical campaign's creative dashboard
    Then the user is presented with a visual indicator that shows that 5 changes are staged

  @JIRA-CPI-167
  Scenario: User generates a new staged change

    When a user is navigating the typical campaign's creative dashboard
    And a user updates the first creative's headline to "a different value"
    Then the user is presented with a visual indicator that shows that 6 changes are staged

  @JIRA-CPI-203
  Scenario: A quick view shows a list of changes pending

    When a user is navigating the typical campaign's creative dashboard
    And the user views the Quick View of staged changes
    Then the user sees a visual element that shows "5 changed creatives"
    And the user is presented with the option to view the full list of changes

  @JIRA-CPI-136 @JIRA-CPI-135
  Scenario: Cancel a staged change

    Given changes are staged for publishing
    And the user is presented with an indication that changes are staged
    When a user selects some option for viewing the staged changes
    And the user cancels the changes for multiple entities
    Then the changes are canceled and no longer appear on the list of changes

  @JIRA-CPI-134
  Scenario: Publish a list of staged changes from the detailed staged changes view

    Given changes are staged for publishing
    And the user is viewing a campaign's creative dashboard
    When the user selects the option to see all staged changes from the Quick View
    And the user selects the option to publish all staged changes
    Then the staged changes are submitted for publishing
    And the user is navigated back to the campaign's creative dashboard




