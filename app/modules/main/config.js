angular.rlmodule('rl.cpi.main.config', ['chieffancypants.loadingBar', 'ngAnimate'])
    .factory('Config', function() {
        return {
            gatewayBaseUrl: "http://localhost:8001"
        };
    })
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    });
