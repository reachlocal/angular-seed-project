describe("AdgroupFilter", function() {
    var $state;
    var location;
    var service;

    beforeEach(function () {
        module('rl.cpi.main.services.AdgroupFilter');
        module('ui.router');
        inject(function (AdgroupFilter, $location, _$state_) {
            $state = _$state_;
            spyOn($state, 'go');

            location = $location;
            location.search('adgroups', "");
            service = AdgroupFilter;
        });
    });

    describe("isFiltering", function() {
        it("false when no adgroups are in query string", function() {
            location.search('adgroups', "");
            expect(service.isFiltering()).toBe(false);
        });
        it("true when adgroups are in query string", function() {
            location.search('adgroups', "678,890");
            expect(service.isFiltering()).toBe(true);
        });
    });

    // AdgroupFilter.isDisplayed(creative.adgroup.id)
    describe("isDisplayed(adgroup_id)", function() {
        it("false when adgroup_id is not in query string", function() {
            location.search('adgroups', "999,123");
            expect(service.isDisplayed(456)).toBe(false);
        });
        it("true when adgroup_id is in query string", function() {
            location.search('adgroups', "999,456,123");
            expect(service.isDisplayed(456)).toBe(true);
        });
    });

    describe("add(adgroup_id)", function() {
        it('adgroup becomes isDisplayed=true', function() {
            expect(service.isDisplayed('789')).toBe(false);
            service.add(789);
            expect(service.isDisplayed('789')).toBe(true);
            expect($state.go).toHaveBeenCalled();
        });
    });

    describe("remove(adgroup_id)", function() {
        it('adgroup becomes isDisplayed=false', function() {
            location.search('adgroups', "999,789");
            expect(service.isDisplayed('789')).toBe(true);
            service.remove(789);
            expect(service.isDisplayed('789')).toBe(false);
            expect($state.go).toHaveBeenCalled();
        });
    });

    describe("clear()", function() {
        it("all adgroups become isDisplayed=false", function() {
            location.search('adgroups', "999,789");
            expect(service.isDisplayed('999')).toBe(true);
            expect(service.isDisplayed('789')).toBe(true);
            service.clear();
            expect(service.isDisplayed('999')).toBe(false);
            expect(service.isDisplayed('789')).toBe(false);
            expect($state.go).toHaveBeenCalled();
        });
    });

    describe("registering adgroups", function() {
        it("registers an adgroup", function() {
            service.registerAdgroup("mom", 1);
            expect(service.allRegisteredNames()).toEqual(["mom"]);
        });
        it("registers multiple adgroups with the same name", function() {
            service.registerAdgroup("mom", 1);
            service.registerAdgroup("mom", 9);
            expect(service.allRegisteredNames()).toEqual(["mom"]);
        });
        it("registers multiple, distint adgroups", function() {
            service.registerAdgroup("mom", 1);
            service.registerAdgroup("mom", 9);
            service.registerAdgroup("dad", 10);
            expect(service.allRegisteredNames()).toEqual(["mom", "dad"]);
        });
    });

    describe("toggling by name", function() {
        beforeEach(function() {
            service.registerAdgroup("mom", 1);
            service.registerAdgroup("mom", 2);
            service.registerAdgroup("dad", 3);
        });
        it("enables all by name", function() {
            service.addAllByName("mom");
            expect(service.isDisplayed(1)).toBe(true);
            expect(service.isDisplayed(2)).toBe(true);
            expect(service.isDisplayed(3)).toBe(false);
        });
        it("disables all by name", function() {
            service.addAllByName("mom");
            service.removeAllByName("mom");
            expect(service.isDisplayed(1)).toBe(false);
            expect(service.isDisplayed(2)).toBe(false);
            expect(service.isDisplayed(3)).toBe(false);
        });
    });
});
