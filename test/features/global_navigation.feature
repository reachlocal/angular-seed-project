Feature: Each dashboard should have a consistent global navigation function

	Story: As a logged in CP user 
		   I want to see a global nav filter that displays an option to filter by ALL ad groups
		   So that I can drill down to an ad group regardless of publisher
		
	Scenario: View campaign-level dashboard
		Given a campaign with publishers participating ("Google", "Yahoo/Bing")
		When a user filters using All AdGroups, All Publishers
		Then the dashboard should be filtered to include all data for the campaign
		
		