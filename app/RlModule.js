/**
 * A replacement for angular.module - this will bundle namespaced components together
 * in an awesome way.
 * TODO:  Document!
 **/
//window.name = 'NG_DEFER_BOOTSTRAP!';
var RlModule = new function() {

    // These are the modules that are explicitly defined
    // These must not be clobbered when we compile the namespaces
    // Key:    Module name
    // Value:  Module's dependencies
    // {'moduleName': ['dep1', 'dep2'], ...}
    var modules = {};
    var namespaces = {};

    // TODO: Allow infinate params - pass param 3+ through to angular.module
    this.module = function(moduleName, depsArray) {
        modules[moduleName] = depsArray;
        addNamespace(moduleName);
        var module = angular.module(moduleName, depsArray);
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
    };

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
        angular.bootstrap(document, ['rl']);
    }

    // Don't build modules and bootstrap until RlLoader has loaded everything
    // If we use ngApp, it auto-bootstraps too early (sometimes)  :S
    document.addEventListener('RlLoaderFinished', buildModuleBundle);

}

angular.rlmodule = RlModule.module;
/**
var module = RlModule.module('rl.cpi.main.controllers.sample', ['$Resource']);
module.controller(function('Sample', $scope) {});
**/
