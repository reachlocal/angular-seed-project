/**
 * A replacement for angular.module - this will bundle namespaced components together
 * in an awesome way.
 *
 * Given a bunch of 'nested' modules:
 *   angular.rlmodule('myapp.controllers.FooCtrl', []).controller('FooCtrl', ...);
 *   angular.rlmodule('myapp.controllers.BarCtrl', []).controller('BarCtrl', ...);
 *   angular.rlmodule('myapp.directives.rlDaFunk', []).directive('rlDaFunk', ...);
 *
 * When I reference a parent module:
 *   angular.module('myapp.controllers');
 *   OR
 *   angular.module('myapp');
 *   OR
 *   angular.rlmodule('myapp.controllers.AllDirectives', ['myapp.directives']).controller('AllDirectives', ...);
 *   OR
 *   <body ng-app='myapp'></body>
 *
 * Then I should get all components declared on child modules
 **/
(function() {

    // These are the modules that are explicitly defined
    // These must not be clobbered when we compile the namespaces
    // Key:    Module name
    // Value:  Module's dependencies
    // {'moduleName': ['dep1', 'dep2'], ...}
    var modules = {};
    var namespaces = {};

    this.module = function(moduleName, depsArray) {
        var args = Array.prototype.slice.call(arguments);
        modules[moduleName] = depsArray;
        addNamespace(moduleName);
        var module = angular.module.apply(null, args);
        buildModuleBundle();
        return module;
    };

    function addNamespace(moduleName) {
        var pieces = moduleName.split('.');
        pieces.pop();
        var ns = [];
        for (var i = 0; i < pieces.length; i++) {
            ns.push(pieces[i]);
            var nsString = ns.join('.');
            if (!namespaces[nsString]) {
                namespaces[nsString] = [];
            }
            namespaces[nsString].push(moduleName);
        }
    }

    function buildModuleBundle() {
        for (var ns in namespaces) {
            var deps = namespaces[ns];
            // Do we have an explicitly declared module at this level?
            // If so, include it's dependencies.
            if (modules[ns]) {
                deps = deps.concat(modules[ns]);
            }
            angular.module(ns, deps);
        }

    }

    angular.rlmodule = this.module;
}());
