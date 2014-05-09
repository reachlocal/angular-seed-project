/**
 * Configure dynamic i18n loader.
 * This is a bit of a hacky module that will dynamically load (overwrite) i18n filters
 * supplied by angular's official i18n module.  It'll do it on-the-fly.
 **/
angular
  .rlmodule('rl.cpi.main.config.dynamicLocale', ['tmh.dynamicLocale'])
  .config(function (tmhDynamicLocaleProvider) {
    // Tell tmh how to find angular's locale files for i18n filter goodness
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  });