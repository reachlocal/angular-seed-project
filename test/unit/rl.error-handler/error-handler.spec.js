describe('rl.errorhandler', function () {

  var interceptor;
  var growl = { addErrorMessage: function (message) {
  } };

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

  it('handles error without expected error', function () {
    var error = {
      status: 500
    };
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('The CPI server encountered an error (500).  Please try your request again.');
  });

  it('handles error with messages', function () {
    var error = {
      status: 404
    };
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('Requested resource not found');
  });

  it('ignores 401 errors (sso redirect)', function () {
    var error = {
      status: 401,
      data: 'unexpected error'
    };

    interceptor.responseError(error);
    expect(angular.noop).toHaveBeenCalled();
  });
});