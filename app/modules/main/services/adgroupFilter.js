angular
    .rlmodule('rl.cpi.main.services.AdgroupFilter', ['ui.router', 'underscore'])
    .service('AdgroupFilter', function($location, $state, _) {
        function toArray(value) {
            var string = (value || '').toString();
            var exploded = string.split(',');
            return _.without(exploded, '');
        }

        function AdgroupFilter() {
            function getCurrent() {
                var result = toArray($location.search().adgroups);
                return result;
            }
            this.isFiltering = function() {
                return getCurrent().length > 0;
            };
            this.isDisplayed = function(adgroupId) {
                var current = getCurrent();
                return _.contains(current, adgroupId.toString());
            };
            this.add = function(adgroupId) {
                var current = getCurrent();
                current.push(adgroupId.toString());
                current = _.uniq(current);
                $location.search('adgroups', current.toString());
                $state.go($state.current);
            };
            this.remove = function(adgroupId) {
                var current = getCurrent();
                current = _.without(current, adgroupId.toString());
                $location.search('adgroups', current.toString());
                $state.go($state.current);
            };
            this.clear = function(adgroupId) {
                $location.search('adgroups', '');
                $state.go($state.current);
            };
        }

        return new AdgroupFilter();
    });
