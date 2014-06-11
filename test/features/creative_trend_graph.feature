@trendgraph @JIRA-CPI-3
Feature:  Display trend graph for campaign relevant to the level in which you're viewing


  Background:
    Given a typical campaign exists

  @JIRA-CPI-30
  Scenario: Display a trend graph for the campaign's Creatives (Generic Scenario)

    Given a campaign has historical data over 30 days
    And the nav filter for Ad Groups is set to "ALL AD GROUPS"
    And the nav filter for Publishers is set to "ALL PUBLISHERS"
    And the nav filter for Dates is set to "Last 30 Days"
    When the campaign Creative dashboard is viewed
    Then a trend graph is visible
    And the trend graph contains trend lines for all metrics selected


  @JIRA-CPI-30
  Scenario: Creative Trend Graph should display a trend line for Impressions over time

    Given a campaign has historical impression data over 30 days
    And the nav filter for Ad Groups is set to "ALL AD GROUPS"
    And the nav filter for Publishers is set to "ALL PUBLISHERS"
    And the nav filter for Dates is set to "Last 30 Days"
    When the campaign Creative dashboard is viewed
    Then a Trend Graph showing the number of impressions for all creatives for all Publishers and AdGroups is visible
    And the Trend Graph starts at 30 days before the current date
    And the Trend Graph ends at the day before the current date

  @JIRA-CPI-30
  Scenario: Creative Trend Graph should display a trend line for Clicks over time

    Given a campaign has historical click data over 30 days
    And the nav filter for Ad Groups is set to "ALL AD GROUPS"
    And the nav filter for Publishers is set to "ALL PUBLISHERS"
    And the nav filter for Dates is set to "Last 30 Days"
    When the campaign Creative dashboard is viewed
    Then a Trend Graph showing the number of clicks for all creatives for all Publishers and AdGroups is visible
    And the Trend Graph starts at 30 days before the current date
    And the Trend Graph ends at the day before the current date


  @JIRA-CPI-30
  Scenario: Creative Trend Graph should be able to be filtered by Date Range after the initial view

    Given a campaign has historical impression data over 90 days
    And the nav filter for Ad Groups is set to "ALL AD GROUPS"
    And the nav filter for Publishers is set to "ALL PUBLISHERS"
    And the nav filter for Dates is set to "Last 30 Days"
    And the current Trend Graph for "Last 30 Days" is visible
    When the nav filter for Dates is set to "Last 90 Days"
    Then a Trend Graph showing the number of impressions for all creatives for all Publishers and AdGroups is visible
    And the Trend Graph starts at 90 days before the current date
    And the Trend Graph ends at the day before the current date


  @JIRA-CPI-27
  Scenario:  Display metric buttons above trend graph

    Given a campaign has historical data over 30 days
    And the dashboard filter is set to a single Ad Group
    And the dashboard date filter is set to "Last 30 Days"
    When the campaign dashboard is viewed
    Then the trend graph buttons should be visible
    And the trend graph button "CPC" should be visible
    And the trend graph button "CPL" should be visible
    And the trend graph button "Impressions" should be visible
    And the trend graph button "Clicks" should be visible
    And the trend graph button "CTR" should be visible


  @JIRA-CPI-28
  Scenario: Toggle a trend line using the metric buttons

    Given a campaign has historical data over 30 days
    And the dashboard filter is set to ALL AD GROUPS
    And the dashboard date filter is set to "Last 30 Days"
    When the campaign dashboard is viewed
    And a metric button is deselected
    Then the trend line for the metric button is no longer visible
    When a metric button is selected
    Then the trend line for the metric button is visible







