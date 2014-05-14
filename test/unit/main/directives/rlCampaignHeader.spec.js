describe('Campaign Header', function () {

  var mockScope = {
    CampaignOverview: {
      'name': 'Get rid of ghosts!',
      'advertiserName': 'Ghost Busters, Inc.',
      'masterCampaignId': 789,
      'currentCampaignId': 123,
      'totalCycleBudget': 1900,
      'totalContractLength': 10,
      'spentToDateThisCycle': 500,
      'currentCycle': 6
    }
  };

  // Load the template cache, it's in the 'rl' module
  beforeEach(localeFixture);
  beforeEach(module('rl.cpi'));
  beforeEach(module('rl.cpi.main.directives.rlCampaignHeader'));

  it('should display all summary data', function () {
    var directive = compileDirective('<rl-campaign-header overview="CampaignOverview"></rl-campaign-header>', mockScope);
    var result = directive.element.html();

    expect(result).toContain('Get rid of ghosts!');

    expect(result).toContain('Master Campaign ID:');
    expect(result).toContain('789');

    expect(result).toContain('Current Campaign ID:');
    expect(result).toContain('123');

    expect(result).toContain('Cycle Budget:');
    expect(result).toContain('$1,900.00');

    expect(result).toContain('Contract Length:');
    expect(result).toContain('10');

    expect(result).toContain('Spend to Date this Cycle:');
    expect(result).toContain('$500.00');

    expect(result).toContain('Current Cycle:');
    expect(result).toContain(' 6');
  });

});
