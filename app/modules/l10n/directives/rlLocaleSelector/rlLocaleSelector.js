angular
  .rlmodule('rl.cpi.l10n.directives.rlLocaleSelector', ['ui.bootstrap', 'rl.cpi.l10n.services.LocaleSettings'])
  .directive('rlLocaleSelector', function () {
    return {
      templateUrl: "modules/l10n/directives/rlLocaleSelector/rlLocaleSelector.html",
      scope: {},
      restrict: 'E',
      controller: function ($scope, LocaleSettings) {
        $scope.locales = LocaleSettings.locales;
        $scope.currentLocale = LocaleSettings.locale;
        $scope.chooseLocale = LocaleSettings.locale;
      },
      replace: true
    };
  });
