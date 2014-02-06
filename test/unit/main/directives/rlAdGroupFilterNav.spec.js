describe('Add Group Filter Nav', function () {

    var scope;
    var element;
    var adGroupsData = {
        publishers: [{
            name: "Google",
            adGroups: [{
                name: "Local Roto-rooting",
                id:  123,
                creatives: [{
                    name: "Rooting 24/7",
                    id: 123
                }, {
                    name: "Best Prices",
                    id: 145
                }]
            }, {
                name: "DMA Roto-rooting",
                id: 456,
                creatives: [{
                    name: "Rooting 24/7",
                    id: 123
                }, {
                    name: "Best Prices",
                    id: 145
                }]
            }]
        }, {
            name: "Bing",
            adGroups: [{
                name: "Local Roto-rooting",
                id:  123,
                creatives: [{
                    name: "Rooting 24/7",
                    id: 123
                }, {
                    name: "Best Prices",
                    id: 145
                }]
            }]
        }, {
            name: "ALL",
            adGroups: [{
                name: "Local Roto-rooting",
                id:  123,
                creatives: [{
                    name: "Rooting 24/7",
                    id: 123
                }, {
                    name: "Best Prices",
                    id: 145
                }]
            }, {
                name: "DMA Roto-rooting",
                id: 456,
                creatives: [{
                    name: "Rooting 24/7",
                    id: 123
                }, {
                    name: "Best Prices",
                    id: 145
                }]
            }]
        }]
    };
    var mockAdGroupsService = {
        get: function () {
            return adGroupsData;
        }
    };

    beforeEach(mockDependency('rl.cpi.main.services.adGroups', 'AdGroups').toBe(mockAdGroupsService));
    beforeEach(module('rl.cpi.main.directives.rlAdGroupFilterNav'));
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<rl-ad-group-filter-nav></rl-ad-group-filter-nav>';
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it ("should fetch ad group data", function () {
        var eScope = element.isolateScope();

        expect(eScope.adGroups).toBe(adGroupsData);

    });

});
