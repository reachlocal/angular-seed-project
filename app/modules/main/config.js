angular
    .rlmodule(
        'rl.cpi.main.Config',
        [
            'chieffancypants.loadingBar',
            'pascalprecht.translate',
            'tmh.dynamicLocale',
            'rl.l10n.MultiInterpolator',
            'ngAnimate'
        ]
    )
    .factory('Config', function() {
        return {
            gatewayBaseUrl: "http://localhost:8001"
        };
    })
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    })
    // Configure angular-translate
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '.l10n/lang-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');

        // Allow use of message format interpolation for parametrized translations
        $translateProvider.useInterpolation('MultiInterpolator');
    })
    // Configure angular-dynamic-locale (for number/currency/date formatting)
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.defaultLocale('en');
    });
