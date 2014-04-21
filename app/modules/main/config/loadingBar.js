/**
 * Configure the magical loading bar that appears at the top of the application
 **/
angular
    .rlmodule('rl.cpi.main.config.loadingBar', ['chieffancypants.loadingBar', 'ngAnimate'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    });