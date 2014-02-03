@trendgraph @JIRA-CPI-3
Feature:  Display trend graph for campaign relevant to the level in which you're viewing


  @trendgraph @JIRA-CPI-27
  Scenario:  Display metric buttons above trend graph

    Given a typical campaign exists
    And a campaign has historical data over 30 days
    And the dashboard filter is set to a single Ad Group
    And the dashboard date filter is set to "Last 30 Days"
    When the campaign dashboard is viewed
    Then the trend graph buttons should be visible
    And the trend graph button "CPC" should be visible
    And the trend graph button "CPL" should be visible
    And the trend graph button "Impressions" should be visible
    And the trend graph button "Clicks" should be visible
    And the trend graph button "CTR" should be visible


  @trendgraph @JIRA-CPI-30
  Scenario: Display a trend graph for the campaign

    Given a typical campaign exists
    And a campaign has historical data over 30 days
    And the dashboard filter is set to ALL AD GROUPS
    And the dashboard date filter is set to "Last 30 Days"
    When the campaign dashboard is viewed
    Then a trend graph is visible
    And the trend graph contains trend lines for all metrics selected
    And the trend graph contains markers for all change history types selected


  @trendgraph @JIRA-CPI-28
  Scenario: Toggle a trend line using the metric buttons

    Given a typical campaign exists
    And a campaign has historical data over 30 days
    And the dashboard filter is set to ALL AD GROUPS
    And the dashboard date filter is set to "Last 30 Days"
    When the campaign dashboard is viewed
    And a metric button is deselected
    Then the trend line for the metric button is no longer visible
    When a metric button is selected
    Then the trend line for the metric button is visible







