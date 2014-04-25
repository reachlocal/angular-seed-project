describe('Date Range Service', function () {

  var today      = '2015-10-21';
  var last30Days = '2015-09-21';
  var last60Days = '2015-07-23';
  var last90Days = '2015-04-24';
  var easter     = '2015-04-05';
  var christmas  = '2015-12-25';

  var $state, $location, $rootScope, service;
  beforeEach(module('rl.cpi.main.services.DateRange'));
  beforeEach(inject(function (_$rootScope_, _$location_, _$state_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    spyOn($state = _$state_, 'go').andReturn();
  }));
  afterEach(function () { service = undefined; });

  function buildService() {
    inject(function (DateRange) { service = DateRange; });
  }

  describe('when it initializes', function () {

    beforeEach(function () { timekeeper.freeze(new Date(today + 'T12:00:00')); });
    afterEach(timekeeper.reset);

    it('sets default ranges options', function () {
      buildService();
      var ranges = service.options.ranges;
      expect(ranges.length).toEqual(4);

      expect(ranges[0].label).toMatch(/last 30 days/i);
      expect(ranges[0].value.from).toEqual(last30Days);
      expect(ranges[0].value.to).toEqual(today);

      expect(ranges[1].label).toMatch(/last 60 days/i);
      expect(ranges[1].value.from).toEqual(last60Days);
      expect(ranges[1].value.to).toEqual(today);

      expect(ranges[2].label).toMatch(/last 90 days/i);
      expect(ranges[2].value.from).toEqual(last90Days);
      expect(ranges[2].value.to).toEqual(today);

      expect(ranges[3].label).toMatch(/all time/i);
      expect(ranges[3].value.from).toBeUndefined();
      expect(ranges[3].value.to).toEqual(today);
    });

    it('sets the custom label text', function () {
      buildService();
      expect(service.options.customLabel).toMatch(/custom/i);
    });

    it('sets default range value option', function () {
      buildService();
      var defaultValue = service.options.value;
      expect(defaultValue.from).toEqual(last30Days);
      expect(defaultValue.to).toEqual(today);
    });

    it('sets the maxToDate for today', function () {
      buildService();
      expect(service.options.maxToDate).toEqual(today);
    });

    it('broadcasts a range updated event with the default range', function () {
      spyOn($rootScope, '$broadcast');
      buildService();
      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith('rl:dateRange:updated', {
          from: last30Days,
          to: today
        });
    });
  });

  describe('when the range gets updated', function () {
    beforeEach(buildService);

    it('a rl:dateRange:updated event is broadcast', function () {
      spyOn($rootScope, '$broadcast');
      var expectedRange = { from: christmas, to: easter };
      service.setRange(expectedRange);

      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith('rl:dateRange:updated', expectedRange);
    });

    it('updates the querystring with the new date range', function () {
      spyOn($location, 'search');
      service.setRange({ from: christmas, to: easter });

      expect($location.search).toHaveBeenCalledWith('dateFrom', christmas);
      expect($location.search).toHaveBeenCalledWith('dateTo', easter);
      expect($state.go).toHaveBeenCalled();
    });
  });

  describe('when the query string already has dates on it',function () {
    beforeEach(function () {
      $location.search('dateFrom', easter);
      $location.search('dateTo', christmas);
    });

    it('sets the default value option', function () {
      buildService();
      expect(service.options.value).toEqual({ from: easter, to: christmas });
    });

    it('sets the range to the dates queried', function () {
      spyOn($rootScope, '$broadcast');
      buildService();
      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith('rl:dateRange:updated', {
          from: easter,
          to: christmas
        });
    });
  });
});
