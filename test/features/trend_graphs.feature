@trendgraph @JIRA-CPI-3
Feature:  Display trend graph for campaign relevant to the level in which you're viewing

@trendgraph @JIRA-CPI-27
Scenario:  Display metric buttons above trend graph

Given a campaign has been created
And a campaign has historical data over 30 days
And the dashboard filter is set to ALL AD GROUPS
And the dashboard filter is set to "Last 30 Days"
When the campaign dashboard is viewed
Then the trend graph buttons should be visible
And the trend graph button "CPC" should be visible
And the trend graph button "CPL" should be visible
And the trend graph button "Impressions" should be visible
And the trend graph button "Clicks" should be visible
And the trend graph button "CTR" should be visible




