angular.rlmodule('rl.helloworld.initialize.L10n', ['rl.l10n'])
  .run(function (LocaleSettings) {
    // Set your initial locale
    LocaleSettings.locale('en');

    // Set your default locale
    // If we can't find a translation in your selected locale,
    // we'll look for it using this locale - this is a fallback
    LocaleSettings.defaultLocale('en');

    // What locales are available?
    LocaleSettings.locales(['en', 'pt']);
  });