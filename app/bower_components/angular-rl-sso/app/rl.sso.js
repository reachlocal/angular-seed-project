/**
 * This module will attach to the body of your page.
 * It listens for 401 responses from the REST server.
 * Upon a 401 response, the login page is shown.
 *
 * To use this module, simply include it as a dependancy
 * in your app and implement the server-side component
 * that will catch the SSO redirect and pass the token
 * back to Angular.
 **/
angular.module('rl.sso', ['http-auth-interceptor'])

  // Attach authentication to the body of the page
  .directive('body', function () {
    var directive = { restrict: 'E' };

    // Append the login iframe to the body of the page. Only display it if a login is needed.
    directive.compile = function (element) {
      var template = angular.element('<iframe id="authFrame" ng-if="realm" ng-src="{{ realm }}" scrolling="no"></iframe>');
      element.append(template);
    };

    // http-interceptro will fire an 'event:auth-loginRequired' event upon 401 - handle it
    directive.controller = function ($scope, $window, authService) {
      $scope.$on('event:auth-loginRequired', function (event, response) {
        $scope.realm = $scope.realm || response.data.realm;
      });

      $window.addEventListener('message', function (event) {
        if (event.data.type !== 'token') return;

        var token = event.data.value;
        $window.sessionStorage.setItem('token', token);
        authService.loginConfirmed(dataFrom(token));
        delete $scope.realm;
      }, false);

      function dataFrom(token) { // Spec: http://goo.gl/i3eTMS
        return JSON.parse($window.atob(token.split('.')[1]));
      }
    };

    return directive;
  })

  // Add the auth token to the Authorization head of every REST request
  .factory('authTokenInterceptor', function ($window) {
    return { request: function (config) {
      config.headers = config.headers || {};
      config.headers.Authorization = $window.sessionStorage.token;
      return config;
    }};
  })

  .config(function ($sceDelegateProvider, $httpProvider) {
    // Allow angular to open an iFrame to any reachlocal domain
    $sceDelegateProvider.resourceUrlWhitelist(['https://*.reachlocal.com/**', 'self']);
    $httpProvider.interceptors.push('authTokenInterceptor');
  });
