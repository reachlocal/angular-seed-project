angular
    .rlmodule('rl.cpi.l10n.directives.rlLocaleSelector', ['ui.bootstrap', 'rl.cpi.main.Config', 'pascalprecht.translate', 'tmh.dynamicLocale'])
    .directive('rlLocaleSelector', function () {
        return {
            templateUrl: "modules/l10n/directives/rlLocaleSelector/rlLocaleSelector.html",
            scope: {},
            restrict: 'E',
            controller: function($scope, Config, $translate, tmhDynamicLocale) {
                $scope.locales = Config.locales;
                $scope.currentLocale = $translate.use();

                $scope.chooseLocale = function(locale) {
                    $translate.use(locale);
                    $scope.currentLocale = locale;
                    tmhDynamicLocale.set(locale);
                };
            }
        };
    });
