angular.rlmodule('rl.cpi.main.config', ['chieffancypants.loadingBar', 'ngAnimate'])
    .factory('Config', function() {
        return {
            gatewayBaseUrl: "http://localhost:3000"
        };
    })
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    });
