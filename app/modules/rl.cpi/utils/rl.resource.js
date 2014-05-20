angular.rlmodule('rl.cpi.utils', ['ngResource', 'rl.cpi.main.Config'])
.factory('rlResource', function($resource, Config) {
  return function() {
    var arr = Array.prototype.slice.call(arguments);
    arr[0] = Config.gatewayBaseUrl + arr[0];
    var resource = $resource.apply(this, arr);
    console.log('array from rlResource: ', arr);
    return resource;
  };
});