describe('Publisher Filter Nav', function () {

    var directive;
    var publishers = [{
            name: "Google",
            adGroups: [
                { name: "Local Roto-rooting", id:  123 },
                { name: "DMA Roto-rooting", id: 456 }]
        }, {
            name: "Bing",
            adGroups: [
                { name: "Local Roto-rooting", id:  123 }]
        }, {
            name: "ALL",
            adGroups: [
                { name: "Local Roto-rooting", id:  123 },
                { name: "DMA Roto-rooting", id: 456 }]
        }];

    var mockPublishersService = {
        query: function () {
            return publishers;
        }
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(module('rl'));
    beforeEach(mockDependency('rl.cpi.main.services.publishers', 'Publishers').toBe(mockPublishersService));
    beforeEach(module('rl.cpi.main.directives.rlPublisherFilterNav'));
    beforeEach(function () {
        directive = compileDirective('<rl-publisher-filter-nav></rl-publisher-filter-nav>');
    });

    it("should fetch ad group data", function () {
        var eScope = directive.element.isolateScope();
        expect(eScope.publishers).toBe(publishers);
    });

    it("should display all publishers", function () {
        expect(directive.element.html()).toContain('Google');
        expect(directive.element.html()).toContain('Local Roto-rooting');
    });

});
