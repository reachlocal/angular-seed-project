angular
  .module('rl.l10n.directives.rlLocaleSelector', ['rl.l10n.services.LocaleSettings'])
  .directive('rlLocaleSelector', function () {
    return {
      template: '<label>{{ "rlLocaleSelector.Locale" | translate }}:\
                  <select ng-change="chooseLocale(locale)" ng-model="locale" ng-init="locale=currentLocale()">\
                    <option ng-repeat="locale in locales()" value="{{ locale }}" translate> rlLocaleSelector.{{ locale }}</option>\
                  </select>\
                </label>',
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
