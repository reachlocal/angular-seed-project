describe('Publisher Filter Nav', function () {

    var directive;
    var mockScope = {
        CtrlPublishers: [{
            name: "Google",
            ad_groups: [
                { name: "Local Roto-rooting", id:  123 },
                { name: "DMA Roto-rooting", id: 456 }]
        }, {
            name: "Bing",
            ad_groups: [
                { name: "Local Roto-rooting", id:  123 }]
        }, {
            name: "ALL",
            ad_groups: [
                { name: "Local Roto-rooting", id:  123 },
                { name: "DMA Roto-rooting", id: 456 }]
        }]
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlPublisherFilterNav'));
    beforeEach(function () {
        directive = compileDirective('<rl-publisher-filter-nav publishers="CtrlPublishers"></rl-publisher-filter-nav>', mockScope);
    });

    it("should display all publishers", function () {
        expect(directive.element.html()).toContain('Google');
        expect(directive.element.html()).toContain('Local Roto-rooting');
    });

});
