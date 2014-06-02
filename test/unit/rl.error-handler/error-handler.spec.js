describe('rl.errorhandler', function () {

  var interceptor;
  var growl = { addErrorMessage: angular.noop };

  beforeEach(mockDependency('angular-growl', 'growl').toBe(growl));

  beforeEach(function () {
    spyOn(angular, 'noop');
    module('rl.errorhandler');
    // Prevent messages to exceptionHandler from failing the test
    module(function($exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
    });
    inject(function (errorInterceptor) {
      interceptor = errorInterceptor;
    });
    spyOn(growl, 'addErrorMessage');
  });

  it('sets error options', function () {
    interceptor.responseError({ status: 404 });
    expect(growl.addErrorMessage).toHaveBeenCalledWith(jasmine.any(String), { enableHtml: true, ttl: 5000 });
  });

  it('handles errors with error objects', function () {
    var error = {
      status: 500,
      data: [ { name: 'error', message: 'message' } ]
    };
    var expErrorMessage = 'errorhandler.error_500<br><b>error:</b> message';
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith(expErrorMessage, jasmine.any(Object));
  });

  it('handles errors without error objects', function () {
    var error = {
      status: 404
    };
    var expErrorMessage = 'errorhandler.error_404';
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith(expErrorMessage, jasmine.any(Object));
  });

});
