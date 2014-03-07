/**
 * Configure the core l10n module - angular-translate
 * Include the MultiInterpolator wrapper we wrote :)
 **/
angular
    .rlmodule('rl.cpi.main.config.angularTranslate', ['pascalprecht.translate', 'rl.l10n.MultiInterpolator', 'rl.cpi.main.Config'])
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '.l10n/lang-',
            suffix: '.json'
        });

        $translateProvider.use('en');

        // Allow use of message format interpolation for parametrized translations
        $translateProvider.useInterpolation('MultiInterpolator');
    })
    .run(function($translate, Config) {
        if (Config.defaultLocale) {
            $translate.use(Config.defaultLocale);
        }
    });