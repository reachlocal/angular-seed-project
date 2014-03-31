Feature: Ability to stage changes to business entities before they are pushed to publishers


  @JIRA-CPI-134 @JIRA-CPI-135
  Scenario: Publish a list of staged changes

    Given a typical campaign exists
    And changes are staged for publishing
    And the user is presented with an indication that changes are staged
    When a user selects some option for viewing the staged changes
    And the user approves the changes for multiple entities
    Then the changes are published

  @JIRA-CPI-136 @JIRA-CPI-135
  Scenario: Publish a list of staged changes

    Given a typical campaign exists
    And changes are staged for publishing
    And the user is presented with an indication that changes are staged
    When a user selects some option for viewing the staged changes
    And the user cancels the changes for multiple entities
    Then the changes are canceled and no longer appear on the list of changes



