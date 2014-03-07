/**
 * Configure dynamic i18n loader.
 * This is a bit of a hacky module that will dynamically load (overwrite) i18n filters
 * supplied by angular's official i18n module.  It'll do it on-the-fly.
 **/
angular
    .rlmodule('rl.cpi.main.config.dynamicLocale', ['tmh.dynamicLocale'])
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        //tmhDynamicLocaleProvider.defaultLocale('en');
    })
    .run(function(tmhDynamicLocale, Config) {
        if (Config.defaultLanguage) {
            tmhDynamicLocale.set(Config.defaultLanguage);
        }
    });