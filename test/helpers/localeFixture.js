/**
 * Run in a beforeEach to setup static translation cache
 * If you don't use this, you'll get unexpected HTTP calls
 * for the static translation files.
 *
 * Note:  You may still get a WARN [web-server]: 404: /bower_components/angular-
 * i18n/angular-locale_en.js
 * This is caused by the i18n auto-loader, tmhDynamicLocaleProvider.
 * I haven't found a good way to prevent this.  (You can proxy the serve:app server),
 * but that's a lot of overhead for a minor thing.
 * @param moduleName        Name of the module to attach this config to
 *                          Ex: 'rl.cpi.main.Config'
 *                          Default:  'rl'
 * @param translations      Custom translations object
 *                          Ex: {'MY_STRING': 'Localized string'}
 * @return module function
 */
function localeFixture(moduleName, customTranslations) {
  var DEFAULT_MODULE = 'rl';
  var DEFAULT_LANG = 'en';
  var DEFAULT_TRANSLATIONS = translations; // Declared globally by the l10n.js file (hack!)

  return module(moduleName || DEFAULT_MODULE, function config($translateProvider) {
    $translateProvider.translations(DEFAULT_LANG, customTranslations || DEFAULT_TRANSLATIONS);
    $translateProvider.preferredLanguage(DEFAULT_LANG);
  });
}