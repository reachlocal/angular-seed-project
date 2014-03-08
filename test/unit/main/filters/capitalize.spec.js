describe('Capitalize filter', function () {
    var filter;
    beforeEach(function () {
        module('rl.cpi.main.filters.Capitalize');
        inject(function ($filter) {
            filter = $filter('capitalize');
        });
    });

    it('should capitalize a text', function () {
        expect(filter('UPPER')).toBe('Upper');
        expect(filter('lower')).toBe('Lower');
        expect(filter('ALL CAPS PHRASE')).toBe('All caps phrase');
    });

    it('should capitalize single letters', function () {
        expect(filter('A')).toBe('A');
        expect(filter('b')).toBe('B');
    });

    it('should ignore blanks and undefined', function () {
        expect(filter('')).toBe('');
        expect(filter(undefined)).toBe(undefined);
        expect(filter(null)).toBe(null);
    });
});
