angular
  .module('rl.l10n', [
    'rl.l10n.services.MultiInterpolator',
    'rl.l10n.services.LocaleSettings',
    'rl.l10n.directives.rlLocaleSelector',
    'pascalprecht.translate', 'tmh.dynamicLocale'])
  .config(function ($translateProvider) {
    // Tell translate how to find our translation files
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/lang-',
      suffix: '.json'
    });

    // We need some kind of default that can be used before
    // The Config service is available...
    $translateProvider.use('en');

    // Allow use of message format interpolation for parametrized translations
    $translateProvider.useInterpolation('MultiInterpolator');
  })
  .config(function (tmhDynamicLocaleProvider) {
    // Tell tmh how to find angular's locale files for i18n filter goodness
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  });
