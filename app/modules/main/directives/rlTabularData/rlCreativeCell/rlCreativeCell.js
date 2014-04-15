angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCell', ['ui.bootstrap', 'xeditable'])
    .directive('rlCreativeCell', function() {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlCreativeCell/rlCreativeCell.html",
            scope: {
                creative: '='
            },
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.update = function (attribute, index, data) {
                    var updatedModel = angular.copy($scope.creative);
                    updatedModel[attribute][index] = data;
                    return updatedModel.$update();
                };
            }
        };
    });
