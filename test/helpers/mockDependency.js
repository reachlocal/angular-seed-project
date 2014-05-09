/**
 * Take a given module name, dep, and mock implementation of said dep
 * Setup the angular provider to return the mock when the dep is requested
 * @param moduleName        ex: 'rl.cpi.main.services.myFoo'
 * @param dependencyName    ex: 'MyFoo'
 * @returns {Object}
 */
function mockDependency(moduleName, dependencyName) {
  return {
    /**
     * Create the mock.
     * @param mock              ex: { get: function () { return 'foo'; } }
     * @returns {Function}
     */
    toBe: function (mock) {
      return function () {
        module(moduleName);
        module(function ($provide) {
          $provide.value(dependencyName, mock);
        });
      };
    }
  };
}