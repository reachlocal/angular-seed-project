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
    it("parses arrays from strings", function () {
        expect(toArrayService('["foo"]')).toEqual(['foo']);
    });
    it("parses arrays from strings with commas", function() {
        expect(toArrayService('foo,foo2')).toEqual(['foo', 'foo2']);
    });
    it("parses non-array strings as single-element arrays", function () {
        expect(toArrayService('foo')).toEqual(['foo']);
    });
    iit("parses everything as a string strings as single-element arrays", function () {
        expect(toArrayService(123)).toEqual(['123']);
    });
    it("parses null as empty array", function () {
        expect(toArrayService(null)).toEqual([]);
    });
    it("parses an empty string and returns an empty array", function () {
        expect(toArrayService("")).toEqual([]);
    });

});