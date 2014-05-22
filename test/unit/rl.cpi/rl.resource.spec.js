describe('rlResource module', function () {

  var fakeResource;

  beforeEach(module('rl.cpi.utils'));

  beforeEach(module(function ($provide) {
    $provide.value('$resource', fakeResource = { apply: jasmine.createSpy('fake resource') });
    $provide.value('Config', { gatewayBaseUrl: 'http://gateway' });
  }));

  it('auguments the resource path and delegates the params', inject(function(rlResource) {
    var defaultArguments = { 'campaignId': '@campaignId', 'textCreativeId': '@id' };
    var instanceMethods = { 'method': 'PUT' };

    rlResource('/foo', defaultArguments, instanceMethods);

    expect(fakeResource.apply).toHaveBeenCalledWith(jasmine.any(Object),['http://gateway/foo', defaultArguments, instanceMethods]);
  }));
});