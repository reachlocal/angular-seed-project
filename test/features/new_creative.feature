Feature: Add a new creative to an existing ad group


  Background:
    Given a typical campaign exists
    And a user is navigating the typical campaign's creative dashboard

  @JIRA-CPI-222 @regression
  Scenario: Navigate to the new creative view

    Given the user has navigated to the Add Creative view
    Then the user is presented with a view to add a new creative in a master template
    And the master template includes a headline, two descriptive lines, and an AdGroup selector
    And all of the active publishers are displayed to the user

  @JIRA-CPI-246 @regression
  Scenario: Navigate to the new creative view after filtering by Publisher

    When the user selects the web publisher campaign "Google (National)"
    And the user has navigated to the Add Creative view
    Then the only active publisher creative box is "Google (National)"

  @JIRA-CPI-222 @regression
  Scenario: Enter headline and descriptive lines for a new creative

    Given the user has navigated to the Add Creative view
    When the user enters text in the headline and descriptive lines
    Then the text is copied character-by-character into the publisher-specific fields
    And the character counts for each active publisher-specific creative is updated per character typed

  @JIRA-CPI-222 @JIRA-CPI-224 @regression
  Scenario: Select a master ad group for a new creative when the AdGroup exists for all the publishers except for one

    Given the user has navigated to the Add Creative view
    And the user enters text in the headline and descriptive lines
    When the user selects an AdGroup in the master creative template that does not exist for all the publishers
    Then that AdGroup is selected for all active publisher-specific creatives who support that AdGroup
    And the publisher that does not support that AdGroup will not be changed
    And the publisher that does not support that AdGroup will become unlinked

  @JIRA-CPI-175 @regression
  Scenario: Deactivate a publisher-specific creative while adding a new creative before making edits

    Given the user has navigated to the Add Creative view
    When the user selects the option to deactivate the publisher-specific creative
    Then the editable fields in the publisher-specific creative are disabled
    And the option to activate the publisher-specific creative becomes available


  @JIRA-CPI-175 @regression
  Scenario: Deactivate a publisher-specific creative while adding a new creative after making edits

    Given the user has navigated to the Add Creative view
    When the user enters text in the headline and descriptive lines
    And the user selects the option to deactivate the publisher-specific creative
    Then the editable fields in the publisher-specific creative are disabled
    And the editable fields are cleared of text
    And the option to activate the publisher-specific creative becomes available


  @JIRA-CPI-175 @regression
  Scenario: Activate a publisher-specific creative that was previously deactivated

    Given the user has navigated to the Add Creative view
    And the user enters text in the headline and descriptive lines
    And the user selects an AdGroup in the master creative template
    And the user selects the option to deactivate the publisher-specific creative
    When the user selects the option to activate the deactivated publisher-specific creative
    Then the headline, descriptive lines, and AdGroup entered in the master template is copied to the newly activated publisher-specific creative


  @JIRA-CPI-224 @regression
  Scenario: Unlink a publisher-specific creative from the master template

    Given the user has navigated to the Add Creative view
    And the view shows multiple publisher-specific creatives as active
    When the user selects the option to unlink a publisher-specific creative
    And the user enters text in the headline and descriptive lines
    Then the text is not copied into the publisher-specific fields
    And there is a visual indicator that shows the publisher specific creative is unlinked

  @JIRA-CPI-224 @regression
  Scenario: Link a publisher-specific creative to the master template

    Given the user has navigated to the Add Creative view
    And the view shows multiple publisher-specific creatives as active
    And at least one publisher-specific creative is currently unlinked
    When the user enters different content into the master template fields
    And the user selects the option to link a publisher-specific creative
    Then the publisher-specific creative's data attributes are immediately copied from the master creative
    And there is a visual indicator that shows the publisher specific creative is linked


  @JIRA-CPI-225 @regression
  Scenario: Saving a new creative

    Given the user has navigated to the Add Creative view
    And the user enters text in the headline and descriptive lines
    And the user selects an AdGroup in the master creative template
    When the user selects the option to save the new creative
    Then the new creative is staged for publishing

