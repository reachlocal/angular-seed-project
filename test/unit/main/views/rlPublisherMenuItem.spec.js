describe('Publisher Menu Item', function () {

    var mockScope = {
        CtrlPublishers: {
            "allAdGroups": {
                name: "ALL",
                adGroups: [
                    { name: "Local Roto-rooting", id: 123 },
                    { name: "DMA Roto-rooting", id: 456 }
                ]
            }
        }
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlPublisherMenuItem'));

    it("should display the badge when adgroups are present for ALL", function () {
        directive = compileDirective('<rl-publisher-menu-item item="CtrlPublishers.allAdGroups"></rl-publisher-menu-item>', mockScope);
        expect(directive.element.find('span').attr('class')).toNotContain('ng-hide');
    });

    it("should not display the badge when no adgroups are present for ALL", function () {
        mockScope.CtrlPublishers.allAdGroups.adGroups = [];
        directive = compileDirective('<rl-publisher-menu-item item="CtrlPublishers.allAdGroups"></rl-publisher-menu-item>', mockScope);
        expect(directive.element.find('span').attr('class')).toContain('ng-hide');
    });
});
