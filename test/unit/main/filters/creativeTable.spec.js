describe('Creative Table filter', function () {
    var rows = [
        {creative: {adGroup: {id: 123}}},
        {creative: {adGroup: {id: 456}}},
        {creative: {adGroup: {id: 789}}}
    ];
    var $stateParams;
    var filter;
    beforeEach(function () {
        module('ui.router');
        module('rl.cpi.main.filters.CreativeTable');
        inject(function (_$stateParams_) {
            $stateParams = _$stateParams_;
        });
        inject(function ($filter) {
            filter = $filter('CreativeTable');
        });
    });

    describe('No adgroups are active', function () {
        it('shows all rows', function () {
            $stateParams.adgroups = [];
            expect(filter(rows)).toEqual(rows);
        });
    });

    describe('One adgroup is active', function() {
        it('shows selected adgroup', function () {
            $stateParams.adgroups = [123];
            expect(filter(rows)).toEqual([rows[0]]);
        });
    });

    describe('Multiple adgroups are active', function() {
        it('shows selected adgroups', function () {
            $stateParams.adgroups = [123, 456];
            expect(filter(rows)).toEqual([rows[0], rows[1]]);
        });
    });

});
