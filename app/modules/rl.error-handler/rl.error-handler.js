angular.rlmodule('rl.errorhandler', ['angular-growl', 'pascalprecht.translate', 'ngSanitize'])

  .factory('errorInterceptor', function ($q, growl, $filter) {

    function handleError(error) {
      var errorType = 'errorhandler.error_' + error.status.toString();
      var translate = $filter('translate');


      var message = translate(errorType);
      var messageDetails = [];
      if (error.hasOwnProperty('data') && angular.isArray(error.data)) {
        angular.forEach(error.data, function (errorObject) {
          var errorMessage;
          errorMessage = '<b>' + errorObject.name + ':</b> ' + errorObject.message;
          messageDetails.push(errorMessage);
        });
        message += '<br>' + messageDetails.join('<br>');
      }
      growl.addErrorMessage(message, {
        enableHtml: true,
        ttl: 5000
      });

      return $q.reject(error);
    }

    return { responseError: handleError };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  });
