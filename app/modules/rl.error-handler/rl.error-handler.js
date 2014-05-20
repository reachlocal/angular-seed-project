angular.rlmodule('rl.errorhandler', ['angular-growl'])

  .factory('errorInterceptor', function ($q, growl, $exceptionHandler) {

    // These errors should not be treated as generic
    // If the error 'handler' is a string, we'll throw up a growl message
    // If the error 'handler' is a function, we'll pass the error object to the function
    var handledErrors = {
      '401': angular.noop, // SSO login - do nothing
      '403': 'Access denied', // User isn't authorized to access specified resource
      '404': 'Requested resource not found',
      '409': 'This resource was updated by someone else',
      '422': function (error) {
        try {
          error.data.forEach(function (errorMessage) {
            growl.addErrorMessage(errorMessage.name + ': ' + errorMessage.message);
          });
        } catch (e) {
          growl.addErrorMessage('Unexpected error.');
          e.message = 'Unexpected error while parsing error response from gateway: ' + e.message;
          $exceptionHandler(e);
        }
      }
    };

    function handleError(error) {
      var status = error.status.toString();
      if (handledErrors.hasOwnProperty(status)) {
        var handler = handledErrors[status];
        if (angular.isString(handler)) {
          growl.addErrorMessage(handler);
        } else if (angular.isFunction(handler)) {
          handler(error);
        }
      } else {
        // Generic handler - if we don't know what else to do with it
        growl.addErrorMessage('The CPI server encountered an error (' + error.status + ').  Please try your request again.');
      }
      return $q.reject(error);
    }

    return { responseError: handleError };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  });
