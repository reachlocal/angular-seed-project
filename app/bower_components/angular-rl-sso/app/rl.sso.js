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
  })

  .run(function ($rootScope, $document, $window, authService) {
    var iframe,
      findParent = function () {
        return angular.element(document.getElementsByTagName('body')[0]);
      },
      createIframe = function (realm) {
        // hold it so we can remove it from the dom later
        iframe = angular.element('<iframe id="authFrame" src="' + realm + '" scrolling="no"></iframe>');
        return iframe;
      },
      removeIframe = function () {
        iframe.remove();
        iframe = null;
      },
      noIframeVisible = function() {
        return iframe == null; // iframe is null or undefined
      };

    $rootScope.$on('event:auth-loginRequired', function (event, response) {
      if (noIframeVisible()) {
        findParent().append(createIframe(response.data.realm));
      }
    });

    $window.addEventListener('message', function (event) {
      if (event.data.type !== 'token') return;
      var token = event.data.value;
      $window.sessionStorage.setItem('token', token);
      authService.loginConfirmed(dataFrom(token));
      removeIframe();
    }, false);

    function dataFrom(token) { // Spec: http://goo.gl/i3eTMS
      return JSON.parse($window.atob(token.split('.')[1]));
    }
  });
