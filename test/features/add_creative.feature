Feature: Add a new creative to an existing ad group


  Background:
    Given a typical campaign exists
    And the user is viewing a typical campaign's creative dashboard

  @CPI-JIRA-222
  Scenario: Navigate to the new creative view

    When the user selects the option to add a new creative
    Then the user is presented with a view to add a new creative in a master template
    And the master template includes a headline, two descriptive lines, and an AdGroup selector
    And all of the active publishers are displayed to the user

  @CPI-JIRA-222
  Scenario: Navigate to the new creative view after filtering by Publisher

    When the user has selected a publisher in the global nav filter
    And the user selects the option to add a new creative
    Then the user is presented with a view to add a new creative in a master template
    And the master template includes a headline, two descriptive lines, and an AdGroup selector
    And the only active publisher creative box is the publisher selected in the global nav filter


  @CPI-JIRA-222
  Scenario: Enter headline and descriptive lines for a new creative

    Given the user has navigated to the Add Creative view
    When the user enters text in the headline and/or descriptive lines
    Then the text is copied character-by-character into the publisher-specific fields
    And the character counts for each active publisher-specific creative is updated per character typed

  @CPI-JIRA-222
  Scenario: Select a master ad group for a new creative

    Given the user has navigated to the Add Creative view
    And the user has entered a headline and descriptive lines in the master creative template
    When the user selects an AdGroup in the master creative template
    Then that AdGroup is selected for all active publisher-specific creatives

  @CPI-JIRA-175
  Scenario: Deactivate a publisher-specific creative while adding a new creative before making edits

    Given the user has navigated to the Add Creative view
  	When the user selects the option to deactivate the publisher-specific creative
  	Then the editable fields in the publisher-specific creative are disabled
  	And the option to activate the publisher-specific creative becomes available


  @CPI-JIRA-175
  Scenario: Deactivate a publisher-specific creative while adding a new creative after making edits

    Given the user has navigated to the Add Creative view
  	And the user has entered a headline and descriptive lines in the master creative template
  	When the user selects the option to deactivate the publisher-specific creative
  	Then the editable fields in the publisher-specific creative are disabled
  	And the editable fields are cleared of text
  	And the option to activate the publisher-specific creative becomes available


  @CPI-JIRA-175
  Scenario: Activate a publisher-specific creative that was previously deactivated

    Given the user has navigated to the Add Creative view
    And the user has entered text into the master template's headline and descriptive line fields
    And the user has selected an AdGroup in the master template
    And the user has previously deactivated a publisher-specific creative
    When the user selects the option to activate the deactivated publisher-specific creative
    Then the headline, descriptive lines, and AdGroup entered in the master template is copied to the newly activated publisher-specific creative




