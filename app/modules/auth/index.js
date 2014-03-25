angular.rlmodule('rl.auth', ['http-auth-interceptor'])

.directive('body', function () {
    var directive = { restrict: 'E' };

    directive.compile = function (element) {
        var template = angular.element('<iframe id="authFrame" ng-if="realm" ng-src="{{ realm }}" scrolling="no"></iframe>');
        element.append(template);
    };

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

        function dataFrom (token) { // Spec: http://goo.gl/i3eTMS
            return JSON.parse($window.atob(token.split('.')[1]));
        }
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
