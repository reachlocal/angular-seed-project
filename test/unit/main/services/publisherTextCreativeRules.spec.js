describe("PublisherTextCreativeRules", function () {

  var service;
  var rulesStub = [
    {
      publisherId: 1,
      publisherName: "Google",
      headLines: [ "Google:mockHeadLines" ]
    },
    {
      publisherId: 2,
      publisherName: "Bing",
      headLines: [ "Bing:mockHeadLines" ]
    }
  ];
  var campaignId = 1;

  beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));
  beforeEach(function () {
    localeFixture();
    module("rl.cpi.main.services.PublisherTextCreativeRules");
    inject(function (PublisherTextCreativeRules) {
      service = PublisherTextCreativeRules;
    });
    httpResolver.beforeEach();
    httpResolver.$httpBackend.expectGET('/publisher-text-creative-rules?campaignId=' + campaignId).respond(rulesStub);
  });

  afterEach(httpResolver.afterEach);

  it("returns data from domain service rules", function () {
    var rules = service.allByCampaignId(campaignId);
    httpResolver.resolve();

    expect(rules.forPublisherId(1).publisherId).toEqual(rulesStub[0].publisherId);
    expect(rules.forPublisherId(2).publisherName).toEqual(rulesStub[1].publisherName);
  });

  it("returns data from default rule template", function () {
    var rules = service.allByCampaignId(campaignId);
    var defaultRule = rules.defaultRule();
    var publisherOne = rules.forPublisherId(1);
    expect(publisherOne.publisherName).toEqual(defaultRule.publisherName);

    httpResolver.resolve();
  });

  it("cleanly updates default rules after domain service returns real rules", function () {
    var rules = service.allByCampaignId(campaignId);
    var publisherOne = rules.forPublisherId(1);

    httpResolver.resolve();

    expect(publisherOne.publisherName).toEqual(rulesStub[0].publisherName);
    expect(publisherOne.headLines).toEqual(rulesStub[0].headLines);
  });

  it("caches rulesets by campaignId", function () {
    var rulesA = service.allByCampaignId(campaignId);
    var publisherOneA = rulesA.forPublisherId(1);
    var rulesB = service.allByCampaignId(campaignId);
    var publisherOneB = rulesB.forPublisherId(1);

    expect(publisherOneA).toBe(publisherOneB);
    httpResolver.resolve();
    expect(publisherOneA).toBe(publisherOneB);
  });

  describe("rule object", function () {

    var publisherOne;

    beforeEach(function () {
      publisherOne = service.allByCampaignId(campaignId).forPublisherId(1);
    });

    afterEach(httpResolver.resolve);

    it("provides a flexible accessor for char counts", function () {
      expect(publisherOne.maxChars("headLines", 0)).toEqual(publisherOne.headLines[0].charCount);
    });
  });
});