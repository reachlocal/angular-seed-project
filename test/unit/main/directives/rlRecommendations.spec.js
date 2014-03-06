describe('Recommendation', function () {
    var directive;

    var recommendation_1 = { "id": 4567, "type": "simple_dismiss", "title": "Add 2 more keywords", "description": "Lorem ipsum dolor sit amet." }
    var recommendation_2 = { "id": 7890, "type": "simple_dismiss", "title": "Fill in the link",    "description": "A link must be inserted." }

    var mockScope = {
        NoRecommendations: [],
        SingleRecommendation: [ recommendation_1 ],
        MultipleRecommendations: [ recommendation_1, recommendation_2 ]
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlRecommendations'));
    beforeEach(module('ui.bootstrap'));

    describe("there are no recommendations", function() {
      beforeEach(function () {
          directive = compileDirective('<rl-recommendations recommendations="NoRecommendations" />', mockScope);
      });

      it("does not display a message saying how many recommendations", function() {
        var message = directive.jq_element().find(".count");
        expect(message.hasClass('ng-hide')).toBe(true);
      });

      it("does not show any recommendation", function() {
        var recommendations = directive.jq_element().find(".details");
        expect(recommendations.length).toBe(0);
      });

      it("displays a banner congratulating the user for having no active recommendations", function() {
        var banner = directive.jq_element().find(".congratulations");
        expect(banner.hasClass('ng-hide')).toBe(false);
      });

    });

    describe("there is only one recommendation", function() {
      beforeEach(function () {
          directive = compileDirective('<rl-recommendations recommendations="SingleRecommendation" />', mockScope);
      });

      it("display a message saying there is just one recommendation", function() {
        var message = directive.jq_element().find(".count");
        expect(message.hasClass('ng-hide')).toBe(false);
        expect(message.text()).toContain("1 active recommendation");
      });

      it("shows that recommendation", function() {
        var recommendations = directive.jq_element().find(".details");
        expect(recommendations.length).toBe(1);
        expect(recommendations.text()).toContain(recommendation_1.title);
        expect(recommendations.text()).toContain(recommendation_1.description);
      });

      it("does not display a banner congratulating the user for having no active recommendations", function() {
        var banner = directive.jq_element().find(".congratulations");
        expect(banner.hasClass('ng-hide')).toBe(true);
      });
    });

    describe("there are multiple recommendations", function() {
      beforeEach(function () {
          directive = compileDirective('<rl-recommendations recommendations="MultipleRecommendations" />', mockScope);
      });

      it("display a message saying how many recommendations exist", function() {
        var message = directive.jq_element().find(".count");
        expect(message.hasClass('ng-hide')).toBe(false);
        expect(message.text()).toContain("2 active recommendations");
      });

      it("shows that recommendation", function() {
        var recommendations = directive.jq_element().find(".details");
        expect(recommendations.length).toBe(2);
        expect(recommendations.text()).toContain(recommendation_1.title);
        expect(recommendations.text()).toContain(recommendation_1.description);
        expect(recommendations.text()).toContain(recommendation_2.title);
        expect(recommendations.text()).toContain(recommendation_2.description);
      });

      it("does not display a banner congratulating the user for having no active recommendations", function() {
        var banner = directive.jq_element().find(".congratulations");
        expect(banner.hasClass('ng-hide')).toBe(true);
      });
    });
});
