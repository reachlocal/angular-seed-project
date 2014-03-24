describe("toArray", function () {

    var toArrayService;

    beforeEach(function () {
        module('rl.cpi.main.services.toArray');
        inject(function (toArray) {
            toArrayService = toArray;
        });
    });

    it("handles empty arrays", function () {
        expect(toArrayService([])).toEqual([]);
    });
    it("handles non-empty arrays", function () {
        expect(toArrayService(['foo'])).toEqual(['foo']);
    });
    it("parse arrays from strings", function () {
        expect(toArrayService('["foo"]')).toEqual(['foo']);
    });
    it("parse non-array strings as empty array", function () {
        expect(toArrayService('not an array!')).toEqual([]);
    });
    it("parses null as empty array", function () {
        expect(toArrayService(null)).toEqual([]);
    });

});