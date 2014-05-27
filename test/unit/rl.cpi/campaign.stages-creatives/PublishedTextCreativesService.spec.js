describe('PublishedTextCreativesService', function () {
  var service;
  var Config;
  beforeEach(module('rl.cpi.campaignStagedChanges'));
  beforeEach(inject(function (PublishedTextCreativesService, _Config_) {
    Config = _Config_;
    service = PublishedTextCreativesService;
  }));

  beforeEach(httpResolver.beforeEach);
  afterEach(httpResolver.afterEach);

  it('publishes the given links', function () {
    var campaignId = 1234;
    httpResolver.$httpBackend.expectPOST(Config.gatewayBaseUrl + '/campaigns/' + campaignId + '/published-text-creatives', { links: ['http://luboviko'] }).respond(201, '');
    var response = service.publish(campaignId, ['http://luboviko']);
    expect(response.then).toBeDefined();
    httpResolver.resolve();
  });

});