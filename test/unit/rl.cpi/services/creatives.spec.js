describe('Creatives Service', function () {
  var creative1 = {
    headLines: 'Blah',
    descriptiveLines: [ 'Yadda yadda', 'et cetera' ]
  };
  var service;

  beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));

  beforeEach(function () {
    localeFixture();
    module('rl.cpi.main.services.Creatives');
    inject(function (Creatives) {
      service = Creatives;
    });
    httpResolver.beforeEach();
  });

  afterEach(httpResolver.afterEach);

  it('should fetch creatives from gateway', function () {
    httpResolver.$httpBackend.expectGET('/campaigns/1/text_creatives').respond([ creative1 ]);

    var result = service.query({campaignId: 1});
    httpResolver.resolve();

    expect(result[0].headLines).toEqual('Blah');
  });

  it('creates new creatives on gateway', function () {
    httpResolver.$httpBackend.expectPOST('/campaigns/1/text_creatives').respond(creative1);

    var result = new service(creative1);
    result.campaignId = 1;
    result.$save();
    httpResolver.resolve();

    expect(result.headLines).toEqual('Blah');
  });

  it('knows when it is staged', function () {
    var creative = new service({ status: 'STAGED' });
    expect(creative.isStaged()).toEqual(true);

    creative = new service({ status: 'RUNNING' });
    expect(creative.isStaged()).toEqual(false);

    creative = new service({ status: 'RUNNING', _staged: { 'bla': 'something' } });
    expect(creative.isStaged()).toEqual(true);

    creative = new service({ status: 'RUNNING', _staged: null });
    expect(creative.isStaged()).toEqual(false);
  });

  it('sets the status to staged', function () {
    var creative = new service({ status: 'RUNNING' });
    creative.setStaged();

    expect(creative.status).toEqual('STAGED');
  });
});
