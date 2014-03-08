/**
 * Provide a simple service to get/set locales
 * This interfaces with the Config, angular-translate, and tmhDynamicLocale
 */
angular
    .rlmodule('rl.cpi.l10n.services.LocaleSettings', ['rl.cpi.main.Config', 'pascalprecht.translate', 'tmh.dynamicLocale'])
    .service('LocaleSettings', function(Config, $translate, tmhDynamicLocale) {
        function LocaleSettings() {

            var current = $translate.use();
            var fallback = Config.defaultLocale;

            /**
             * Only setup angular-translate's fallback locale if
             * it differs from the current locale.
             * Setting the fallback triggers an HTTP GET, which may
             * be unnecessary and will break unit tests.  :(
             */
            function applyFallback() {
                if (fallback !== current) {
                    $translate.fallbackLanguage(fallback);
                }
            }

            /**
             * Get an array of all available locales
             * @returns Array
             */
            this.locales = function() {
                return Config.locales;
            };

            /**
             * Get/Set the locale
             * @param String newLocale     Optional - sets locale
             * @return String              The locale
             */
            this.locale = function(newLocale) {
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
            this.fallback = function(newFallback) {
                if (newFallback) {
                    fallback = newFallback;
                    applyFallback();
                }
                return fallback;
            };

        }
        return new LocaleSettings();
    })
    .run(function(LocaleSettings, Config) {
        LocaleSettings.locale(Config.defaultLocale);
    });