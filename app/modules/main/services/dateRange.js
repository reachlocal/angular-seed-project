angular.rlmodule('rl.cpi.main.services.DateRange', ['rl.cpi.main.services.Moment', 'ui.router'])
.service('DateRange', function ($rootScope, $state, $location, Moment) {

  var dateFormat = 'YYYY-MM-DD';
  var today = Moment.build().format(dateFormat);
  var keys = { from: 'dateFrom', to: 'dateTo' };

  function last (amount, granularity) {
    return Moment.build().subtract(granularity, amount).format(dateFormat);
  }

  function broadcast (range) {
    $location.search(keys.from, range.from);
    $location.search(keys.to, range.to);
    $state.go($state.current);
    $rootScope.$broadcast('rl:dateRange:updated', range);
  }

  this.setRange = function (range) {
    if (!range) return;
    broadcast(range);
  };

  var last30Days = { from: last(30, 'days') , to: today };
  var initialRange = last30Days;
  if ($location.search()[keys.from] && $location.search()[keys.to]) {
    var from = $location.search()[keys.from];
    var to = $location.search()[keys.to];
    initialRange = { from: from, to: to };
  }
  this.setRange(initialRange);

  this.options = {
    customLabel: 'rlPublisherFilterNav.dateRange.Custom',
    ranges: [
      { label: 'rlPublisherFilterNav.dateRange.Last 30 days',
        value: last30Days },
      { label: 'rlPublisherFilterNav.dateRange.Last 60 days',
        value: { from: last(60, 'days') , to: today } },
      { label: 'rlPublisherFilterNav.dateRange.Last 90 days',
        value: { from: last(90, 'days') , to: today } },
      { label: 'rlPublisherFilterNav.dateRange.All time',
        value: { from: undefined, to: today } }
    ],
    maxToDate: today,
    value: initialRange
  };
});
