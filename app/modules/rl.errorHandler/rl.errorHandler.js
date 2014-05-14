angular.rlmodule('rl.errorhandler', ['angular-growl'])

  .factory('errorInterceptor', function ($q, growl, $exceptionHandler) {
    return { responseError: function (error) {
      if (error.status === 500) {
        growl.addErrorMessage('Internal server error.');
      } else {
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
      return $q.reject(error);
    }};
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  });
