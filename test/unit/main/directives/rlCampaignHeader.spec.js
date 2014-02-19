describe('Campaign Header', function () {
  var directive;

  var mockScope = {
    CampaignOverview: {
      "name": "Get rid of ghosts!",
      "advertiser_name": "Ghost Busters, Inc.",
      "master_campaign_id": 789,
      "current_campaign_id": 123,
      "total_cycle_budget": 1900,
      "total_contract_length": 10,
      "spent_to_date_this_cycle": 500,
      "current_cycle": 6,
    }
  };

  // Load the template cache, it's in the 'rl' module
  beforeEach(module('rl.cpi'));
  beforeEach(module('rl.cpi.main.directives.rlCampaignHeader'));
  beforeEach(function () {
    directive = compileDirective('<rl-campaign-header overview="CampaignOverview"></rl-campaign-header>', mockScope);
  });

  it("should display all publishers", function () {
    var result = directive.element.html();

    expect(result).toContain("Get rid of ghosts!");
    expect(result).toContain("Ghost Busters, Inc");
    expect(result).toContain("MCID - 789");
    expect(result).toContain("Current CID - 123");
    expect(result).toContain("Total Cycle Budget: $1900");
    expect(result).toContain("Total Contract Length: 10 months");
    expect(result).toContain("Spend to Date this cycle: $500");
    expect(result).toContain("Currently in 6th Cycle");
  });

});
