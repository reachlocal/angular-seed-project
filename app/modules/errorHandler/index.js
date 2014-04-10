angular.rlmodule('rl.errorhandler', ['angular-growl'])

.factory('errorInterceptor', function (growl) {
    return { responseError: function (error) {
        growl.addErrorMessage(error.status === 500 ? 'Internal server error.' : error.data);
        throw error;
    }};
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
});