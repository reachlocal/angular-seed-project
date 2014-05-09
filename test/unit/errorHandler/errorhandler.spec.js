describe('rl.errorhandler', function () {

  var interceptor;
  var growl = { addErrorMessage: function (message) {
  } };

  beforeEach(mockDependency('angular-growl', 'growl').toBe(growl));

  beforeEach(function () {
    module('rl.errorhandler');
    inject(function (errorInterceptor) {
      interceptor = errorInterceptor;
    });
    spyOn(growl, 'addErrorMessage');
  });

  it('handles internal server error', function () {
    var error = {
      status: 500
    };
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('Internal server error.');
  });

  it('handles error with messages', function () {
    var error = {
      status: 404,
      data: [
        { name: 'attribute name', message: 'the error message'}
      ]
    };
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('attribute name: the error message');
  });

  it('handle error without expected message', function () {
    var error = {
      status: 401,
      data: 'unexpected error'
    };
    interceptor.responseError(error);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('Unexpected error.');
  });
});