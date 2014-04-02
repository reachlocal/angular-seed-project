angular
    .rlmodule('rl.cpi.main.services.DateRange', ['rl.cpi.main.services.Moment', 'ui.router'])
    .service('DateRange', function($rootScope, $state, $location, Moment) {
        var dateFormat = "YYYY-MM-DD";
        var today = Moment.build().format(dateFormat);
        var from, to;


        if (!$location.search().dateFrom) {
            from = Moment.build().subtract('days', 30);
        } else {
            from = Moment.build($location.search().dateFrom);
        }
        if (!$location.search().dateTo) {
            to = Moment.build();
        } else {
            to = Moment.build($location.search().dateTo);
        }

        this.from = function(newDate) {
            if (!newDate) { return from; }
            newDate = Moment.build(newDate);
            if (newDate.isSame(from)) { return this; }
            from = newDate;
            broadcast();
            return this;
        };
        this.to = function(newDate) {
            if (!newDate) { return to; }
            newDate = Moment.build(newDate);
            if (newDate.isSame(to)) { return this; }
            to = newDate;
            broadcast();
            return this;
        };

        function broadcast() {
            var range = { from: from, to: to };
            $location.search('dateFrom', from.format(dateFormat));
            $location.search('dateTo',   to.format(dateFormat));
            $state.go($state.current);
            $rootScope.$broadcast('rl:dateRange:updated', range);
        }
        broadcast();
    });
