angular.rlmodule('rl.auth', ['http-auth-interceptor'])

.directive('body', function ($compile) {
    var directive = { restrict: 'E' };

    directive.link = function (scope, element) {
        var template = '<iframe id="authFrame" ng-if="realm" src="{{ realm }}" scrolling="no"></iframe>';
        element.append($compile(template)(scope));
    };

    directive.controller = function ($scope, $window, authService) {
        $scope.$on('event:auth-loginRequired', function (event, response) {
            $scope.realm = response.data.realm;
        });

        angular.element($window).bind('message', function (event) {
            data = JSON.parse(event.data);
            if (data.type !== 'token') return;
            $window.sessionStorage.token = data.value;

            // http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#ExampleJWT
            // var userDetails = JSON.parse($window.atob(data.value.split('.')[1]));
            authService.loginConfirmed();
            delete $scope.realm;
        });
    };

    return directive;
})

.factory('authTokenInterceptor', function ($window) {
    return { request: function (config) {
        config.headers = config.headers || {};
        config.headers.Authorization = $window.sessionStorage.token;
        return config;
    }};
})

.config(function ($sceDelegateProvider, $httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['https://*.reachlocal.com/**', 'self']);
    $httpProvider.interceptors.push('authTokenInterceptor');
});
