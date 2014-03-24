angular
    .rlmodule('rl.cpi.main.directives.rlAdgroupMenuItem', ['ui.bootstrap', 'ui.router', 'rl.cpi.main.services.toArray', 'underscore'])
    .controller('rlAdgroupMenuItemCtrl', function ($scope, $state, toArray, $location, _) {
        var subjectAdgroup = $scope.adgroup.id.toString();
        function isInFilter() {
            return _.contains(toArray($location.search().adgroups), subjectAdgroup);
        }

        function watchSelected(selected) {
            var currentAdgroups = toArray($location.search().adgroups);

            var newAdgroups;
            if (selected) {
                currentAdgroups.push(subjectAdgroup);
                newAdgroups = _.uniq(currentAdgroups);
            } else {
                newAdgroups = _.without(currentAdgroups, subjectAdgroup);
            }

            $location.search('adgroups', newAdgroups.toString());
            $state.go($state.current);
        }

        $scope.$watch('selected', watchSelected);
    })
    .directive('rlAdgroupMenuItem', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherMenuItem/rlAdgroupMenuItem/rlAdgroupMenuItem.html",
            restrict: 'E',
            scope: { adgroup: "=" },
            controller: 'rlAdgroupMenuItemCtrl'
        };
    });
