describe('Creatives', function () {
  var creativeBody = {
    headLines: ['Blah'],
    descriptiveLines: [ 'Yadda yadda', 'et cetera' ]
  };
  var Creative;

  beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));

  beforeEach(function () {
    localeFixture();
    module('rl.cpi.main.services.Creatives');
    inject(function (Creatives) {
      Creative = Creatives;
    });
    httpResolver.beforeEach();
  });

  afterEach(httpResolver.afterEach);

  it('should extend the creative object with its staged counterpart', function() {
    var creative = new Creative({ foo: 'bola', _staged: { foo: 'bla' } });
    expect(creative.foo).toEqual('bla');
  });

  it('should keep a copy of the original creative data', function() {
    var properties = { foo: 'bola', _staged: { foo: 'bla' } };
    var creative = new Creative(properties);

    expect(creative._original).toEqual(properties);
  });

  describe('HTTP calls', function () {
    it('fetch creatives', function () {
      httpResolver.$httpBackend.whenGET('/campaigns/1/text-creatives/').respond([ creativeBody ]);

      Creative.query({campaignId: 1}).then(function(creatives) {
        expect(creatives[0].headLines).toEqual(['Blah']);
      });

      httpResolver.resolve();
    });

    it('removes a creative', function () {
      httpResolver.$httpBackend.expectDELETE('/campaigns/1/staged-text-creatives/10').respond(200);

      var creative = new Creative(creativeBody);
      creative.id = 10;
      creative.campaignId = 1;
      creative.$remove();

      httpResolver.resolve();
    });

    it('updates a creative', function () {
      var creative = new Creative(creativeBody);
      creative.id = 10;
      creative.campaignId = 1;

      httpResolver.$httpBackend.expectPUT('/campaigns/1/text-creatives/10', creative).respond(200);
      creative.$update();

      httpResolver.resolve();
    });

    it('create a creative', function () {
      var creative = new Creative(creativeBody);

      httpResolver.$httpBackend.expectPOST('/campaigns/1/text-creatives/', creative).respond(201);
      creative.$create({ campaignId: 1 });

      httpResolver.resolve();
    });
  });

  it('has a self property for the creative link', function() {
    var properties = { _staged: { links: [{ rel: 'self', href: 'http://luboviko' }] } };
    var creative = new Creative(properties);

    expect(creative.self).toEqual('http://luboviko');

    properties = { _staged: null };
    creative = new Creative(properties);

    expect(creative.self).toEqual(undefined);
  });

  it('checks whether an attribute has changed', function() {
    var properties = { headLines: ['foo', 'bar'], _staged: { headLines: ['foo'] } };
    var creative = new Creative(properties);

    expect(creative.hasChanged('headLines')).toBe(true);
  });

  it('knows when it is staged', function () {
    var creative = new Creative({ status: 'STAGED' });
    expect(creative.isStaged()).toEqual(true);

    creative = new Creative({ status: 'RUNNING' });
    expect(creative.isStaged()).toEqual(false);

    creative = new Creative({ status: 'RUNNING', _staged: { 'bla': 'something' } });
    expect(creative.isStaged()).toEqual(true);

    creative = new Creative({ status: 'RUNNING', _staged: null });
    expect(creative.isStaged()).toEqual(false);
  });

  it('sets the status to staged', function () {
    var creative = new Creative({ status: 'RUNNING' });
    creative.setStaged();

    expect(creative.status).toEqual('STAGED');
  });
});
