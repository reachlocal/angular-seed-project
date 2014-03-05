describe('Recommendation', function () {
    var directive;

    var mockScope = {
        Recommendation: {
            "id": 4567,
            "type": "simple_dismiss",
            "title": "Add 2 more keywords",
            "description": "Lorem ipsum dolor sit amet."
        }
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlRecommendation'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(function () {
        directive = compileDirective('<rl-recommendation recommendation="Recommendation"></rl-recommendation>', mockScope);
    });

    it("displays title and description for that recommendation", function () {
        var result = directive.element.html();

        expect(result).toContain("Add 2 more keywords");
        expect(result).toContain("Lorem ipsum dolor sit amet.");
    });

});
