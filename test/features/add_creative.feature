Feature: Add a new creative to an existing ad group


  Background:
    Given a typical campaign exists
    And the user is viewing a typical campaign's creative dashboard

  Scenario: Add a new creative to a campaign

    When the user selects the option to add a new creative
    Then the user is presented with a screen to add a new creative
    And the publisher selected in the data table filter is the default publisher selected to add a creative to
    And the user is presented with an option to select all publishers
    And the user is presented with options to select and deselect individual publishers

