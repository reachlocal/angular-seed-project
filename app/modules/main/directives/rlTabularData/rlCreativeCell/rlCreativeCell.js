angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCell', ['ui.bootstrap', 'xeditable'])
    .controller('rlCreativeCellCtrl', function($scope) {
      $scope.update = function (attribute, index, data) {
          var updatedModel = angular.copy($scope.creative);
          updatedModel[attribute][index] = data;
          return updatedModel.$update();
      };

      $scope.$watch('creative', function(newValue, oldValue) {
        if (newValue === oldValue) return;
        $scope.creative.setStaged();
      }, true);
    })
    .directive('rlCreativeCell', function() {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlCreativeCell/rlCreativeCell.html",
            scope: {
                creative: '='
            },
            restrict: 'E',
            replace: true,
            controller: 'rlCreativeCellCtrl'
        };
    })
    /**
     * This directive will add a character counter to the x-editable directive.
     * It's only meant to work with input-type fields.
     * If it is ever used in other places (besides Creative Cell), it should be moved up
     * to a top-level directive.
     */
    .directive('rlXcounter', function () {
      var directive = {
        restrict: 'A',
        template: '<span class="rl-xcounter" ng-class="{ negative: $negative }">{{ $remainder }}</span>'
      };

      directive.compile = function ($tElement) {
        $tElement.next().prepend(angular.element(directive.template));
        return directive.link;
      };

      directive.link = function (scope, element, attributes) {
        scope.$watch(attributes.ngModel, function (value) {
          scope.$remainder = parseInt(attributes.rlXcounter) - (value ? value.length : 0);
          scope.$negative = scope.$remainder < 0;
        });
      };

      return directive;
    });