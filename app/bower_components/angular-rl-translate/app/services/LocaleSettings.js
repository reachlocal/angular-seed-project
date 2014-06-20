/**
 * Provide a simple service to get/set locales
 * This interfaces with the angular-translate, and tmhDynamicLocale
 */
angular
  .module('rl.l10n.services.LocaleSettings', ['pascalprecht.translate', 'tmh.dynamicLocale'])
  .service('LocaleSettings', function ($translate, tmhDynamicLocale) {
    function LocaleSettings() {

      // TODO:  Make the config injectable via the provider
      var current = $translate.use();
      var defaultLocale = 'en';
      var locales = [ 'en' ];

      /**
       * Only setup angular-translate's fallback locale if
       * it differs from the current locale.
       * Setting the fallback triggers an HTTP GET, which may
       * be unnecessary and will break unit tests.  :(
       */
      function applyFallback() {
        if (defaultLocale !== current) {
          $translate.fallbackLanguage(defaultLocale);
        }
      }

      /**
       * Get/Set an array of all available locales
       * @param Array newLocales    Example: [ 'en', 'pt', 'jp' ]
       * @returns Array
       */
      this.locales = function (newLocales) {
        if (newLocales) {
          locales = newLocales;
        }
        return locales;
      };

      /**
       * Get/Set the locale
       * @param String newLocale     Optional - sets locale
       * @return String              The locale
       */
      this.locale = function (newLocale) {
        if (newLocale) {
          current = newLocale;
          $translate.use(current);
          tmhDynamicLocale.set(current);
          applyFallback();
        }
        return current;
      };

      /**
       * Get/Set the fallback locale
       * @param String newFallback     Optional - sets fallback locale
       * @return String                The fallback locale
       */
      this.defaultLocale = function (newDefaultLocale) {
        if (newDefaultLocale) {
          defaultLocale = newDefaultLocale;
          applyFallback();
        }
        return defaultLocale;
      };

    }

    return new LocaleSettings();
  });
