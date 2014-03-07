/**
 * Configure the core l10n module - angular-translate
 * Include the MultiInterpolator wrapper we wrote :)
 **/
angular
    .rlmodule('rl.cpi.main.config.angularTranslate', ['pascalprecht.translate', 'rl.l10n.MultiInterpolator', 'rl.cpi.main.Config'])
    .config(function($translateProvider) {
        // Tell translate how to find our translation files
        $translateProvider.useStaticFilesLoader({
            prefix: '.l10n/lang-',
            suffix: '.json'
        });

        // We need some kind of default that can be used before
        // The Config service is available...
        $translateProvider.use('en');

        // Allow use of message format interpolation for parametrized translations
        $translateProvider.useInterpolation('MultiInterpolator');
    });