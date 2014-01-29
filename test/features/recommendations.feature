@JIRA-CPI-2
Feature: Surface recommendations

@sitelinks
Scenario: Surface a recommendation to add site links when none exist

Given a campaign with ads defined
And a campaign with ads activated
And a campaign with Ad Groups
And a campaign using Google as a publisher
When the recommendation engine encounters a campaign without site links implemented
And a previous recommendation was not dismissed by a CP
Then surface a recommendation to add site links to the campaign


@adgroups
Scenario:  Surface a recommendation to add ad groups when there are fewer than 6

Given a campaign with ads defined
And a campaign with ads activated
When the recommendation engine encounters a campaign with less than 6 Ad Groups defined
And a previous recommendation was not dismissed by a CP
Then surface a recommendation to make sure 6 Ad Groups are defined for the campaign


@ads @adgroups @performance
Scenario:  Surface a recommendation to request review of an ad when it outperforms compared to others within the same ad group


Given a campaign with 6 ads defined
And a campaign with all ads activated
And all ads belong to the same ad group
When the recommendation engine encounters the ad group
And 1 ad has a conversion rate XX% greater than the next highest conversion rate for an ad within the same ad group (GRACE:  how much higher?)
Then surface a recommendation to review the ad group
When a CP dismisses the recommendation
Then a reason for dismissal is collected (GRACE:  yes?  for machine learning)
